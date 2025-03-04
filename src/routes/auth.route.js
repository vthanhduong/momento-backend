const controller = require("../controllers/auth.controller");
const express = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.put('/password-change');
module.exports = router;