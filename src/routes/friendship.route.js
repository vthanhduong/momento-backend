const controller = require("../controllers/friendship.controller");
const express = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const router = express();

router.get("/get-friends", isAuthorized, controller.getFriends);
router.post("/add-friend/:id", isAuthorized, controller.addFriendWith);
router.post("/accept-friend/:id", isAuthorized, controller.acceptFriend);
router.post("/unfriend/:id", isAuthorized, controller.unfriend);
router.get("/get-friend-invitations", isAuthorized, controller.getFriendInvitations);
module.exports = router;