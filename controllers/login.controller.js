const User = require('../models/user.model')
const Address = require('../models/address.model')
// const SystemUser = require('../../models/systemUser.model')
const crypto = require('crypto');
const { key } = require('../../config/config').config;
let jwt = require('jsonwebtoken');

async function doLogin(req, res, next) {
    try {
        let loginData = req.body
        loginData.password = crypto.createHash('sha256', key).update(loginData.password).digest('base64');
        let userData = await User.findOne({ $and: [{ mobileNo: loginData.mobileNo }, { password: loginData.password }] }, { include: 'addresses' });
        if (userData) {
            let token = await jwt.sign(
                {
                    userObj: userData,
                },
                key
            );
            let refreshToken = await jwt.sign(
                {
                    userObj: userData,
                },
                key
            );
            return res.sendResponse(true, { userData, accessToken: token, refreshToken: refreshToken }, "Login Successfully.", 200);
        }
        else {

            return res.sendResponse(false, userData, "Invalid Login.", 200);
        }
    }
    catch (err) {
        return res.sendResponse(false, err, "Error Occurred .", 500);
    }
}

async function getRefreshToken(req, res, next) {
    let refreshToken = req.body.refreshToken;
    // For the given username fetch user from DB
    if (refreshToken) {
        jwt.verify(refreshToken, config.secretKey, (err, decoded) => {
            if (err) {
                return res.sendResponse(false, err, 'Refresh Token is not valid', 401);
            } else {
                let token = jwt.sign(
                    {
                        userObj: decoded.userObj,
                    },
                    config.secretKey,
                    {
                        expiresIn: '30d',
                    }
                );
                return res.sendResponse(
                    true,
                    {
                        token,
                    },
                    'Authentication successful!',
                    200
                );
            }

        });
    } else {
        return res.sendResponse(false, '', 'Refresh token is not supplied', 404);
    }
}
module.exports = { doLogin, getRefreshToken };