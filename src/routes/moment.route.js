const controller = require("../controllers/moment.controller");
const express = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const { validate } = require("../validators/moment.validator");
const router = express();

router.post('/upload', isAuthorized, controller.upload)
router.get('/self-moments', isAuthorized, controller.getSelfMoments)
router.get('/get-friend-moments/:id', isAuthorized, controller.getFriendMoments);
router.get('/get-all-moments', isAuthorized, controller.getAllMoments);
router.delete('/delete', isAuthorized, controller.deleteMoment);

module.exports = router;