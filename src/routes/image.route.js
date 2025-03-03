const controller = require("../controllers/image.controller");
const express = require("express");
const router = express();

router.post('/upload', controller.upload);

module.exports = router;