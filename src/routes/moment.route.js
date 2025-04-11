const controller = require("../controllers/moment.controller");
const express = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express();

router.post('/upload', isAuthorized, controller.upload)
router.get('/self-moments', isAuthorized, controller.getSelfMoments)

module.exports = router;