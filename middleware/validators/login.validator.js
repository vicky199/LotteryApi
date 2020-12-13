const validator = require('../../helpers/validate');

const login = (req, res, next) => {
    const validationRule = {
        "mobileNo": "required|number|min:10|max:10",
        "password": "required|string|min:6"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.createResponse(false, err, 'Validation failed', 412);
        } else {
            next();
        }
    });
}

module.exports = {
    login
}