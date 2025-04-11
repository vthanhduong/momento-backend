const controller = require("../controllers/auth.controller");
const express = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const { validate } = require("../validators/auth.validator");
const router = express();

router.post('/login', validate.validateLogin(), controller.login);
router.post('/register', validate.validateRegisteredUser(), controller.register);
router.put('/password-change', isAuthorized);
router.get('/refresh-token', isAuthorized, controller.refreshToken);
module.exports = router;