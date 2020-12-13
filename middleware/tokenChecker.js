const promisifyAll = require('util-promisifyall')
let jwt = require("jsonwebtoken");
const { key } = require('../config/config').config;

let checkToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  try {
    if (token) {
      token = token.slice(7, token.length);
      let decoded = await jwt.verify(token, key,{ ignoreExpiration: true });
      req.decoded = decoded;
      next();
    } else {
      return res.sendResponse(false, "", "Auth token is not supplied", 404);
    }
  }
  catch (err) {
    // if (err.name === 'TokenExpiredError') {
    //   const payload = jwt.verify(token, key, { ignoreExpiration: true });
    //   return res.sendResponse(false, "", "Your Session has Expired,Kindly ReLogin and Try Again.", 401);
    //   // your code
    // }
    return res.sendResponse(false, "", "Your Session has Expired,Kindly ReLogin and Try Again.", 401);
  }
};

module.exports = {
  checkToken: checkToken
};
