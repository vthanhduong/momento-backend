const {check} = require("express-validator");

let validateRegisteredUser = () => {
    return [
        check("username", "Username must not be empty").not().isEmpty(),
        check("username", "Username must be an email").isEmail(),
        check("username", "Username must be 6 characters minimum length at least").isLength({min: 6}),
        check("password", "Password must not be empty").not().isEmpty(),
        check("password", "Password must be 6 characters minimum length at least").isLength({min: 6}),
    ];
}

let validateLogin = () => {
    return [
        check("username", "Username must not be empty").not().isEmpty(),
        check("username", "Username must be an email").isEmail(),
        check("password", "Password must not be empty").not().isEmpty(),
    ];
}

let validateChangedPassword = () => {
    return [

    ]
}

let validate = {
    validateRegisteredUser: validateRegisteredUser,
    validateLogin: validateLogin,
}

module.exports = {validate}