const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express();

router.post('/login', controller.login);

module.exports = router;