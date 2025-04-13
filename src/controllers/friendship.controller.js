const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken } = require("../methods/auth.methods");
const statusCode = require("../utils/http-status-code.const");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.addFriendWith = async (req, res) => {
    const { id } = req.params;
    const verificationToken = await verifyToken(req.headers.authorization, accessTokenSecret);
    const friendship = await prisma.friendship.findFirst({
        where: {
            userId: verificationToken.payload.user.id
        }
    });
    if (id === verificationToken.payload.user.id) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: "địt con mẹ mày ai lại tự kết bạn với chính mình????"
        });
    }
    if (friendship) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: "Already sent an invite or been friends."
        });
    }
    const friend = await prisma.user.findFirst({
        where: {
            id: id
        }
    });
    if (!friend) {
        return res.status(statusCode.NOT_FOUND).json({
            status: "error",
            message: "User not found."
        });
    }
    const uuid = uuidv4();
    const friendInvitation = await prisma.friendship.create({
        data: {
            id: uuid,
            userId: verificationToken.payload.user.id,
            friendId: id,
            isInvitation: 1
        }
    });
    return res.status(statusCode.OK).json({
        status: "success",
        message: "Sent friend invitation successfully.",
        data: friendInvitation,
    });
}

module.exports.acceptFriend = async (req, res) => {
    const { id } = req.params;
    const verificationToken = await verifyToken(req.headers.authorization, accessTokenSecret);
    const friendship = await prisma.friendship.findFirst({
        where: {
            id: id,
            friendId: verificationToken.payload.user.id,
        }
    });
    if (!friendship) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: "Invitation not found."
        });
    }
    const friendId = friendship.userId;
    const userId = friendship.friendId;
    await prisma.friendship.delete({
        where: {
            id: id
        }
    });
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    const friendInvitations = await prisma.friendship.createMany({
        data: [
            {
                id: uuid1,
                userId: friendId,
                friendId: userId,
                isInvitation: 0
            },
            {
                id: uuid2,
                userId: userId,
                friendId: friendId,
                isInvitation: 0
            }
        ]
    });
    return res.status(statusCode.OK).json({
        status: "success",
        message: "Accept friend invitation successfully.",
        data: friendInvitations,
    });
}

module.exports.getFriends = async (req, res) => {

}

module.exports.unfriend = async (req, res) => {

}

module.exports.getFriendInvitations = async (req, res) => {
    const verificationToken = await verifyToken(req.headers.authorization, accessTokenSecret);
    const friendInvitations = await prisma.friendship.findMany({
        where: {
            friendId: verificationToken.payload.user.id,
            isInvitation: 1,
        }
    });
    return res.status(statusCode.OK).json({
        status: "success",
        message: "Get friend invitation successfully.",
        data: friendInvitations,
    });
}

module.exports.rejectInvitations = async (req, res) => {
    
}