require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { generateToken, hashPassword, checkPassword, verifyToken } = require("../methods/auth.methods");
const { validationResult } = require('express-validator');
const statusCode = require('../utils/http-status-code.const');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: {
                errors: errors
            },
        });
    }
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    });
    if (user !== null && await checkPassword(password, user.password) === true) {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const dataForAccessedUser = {
            user: user
        };
        const accessToken = await generateToken(dataForAccessedUser, accessTokenSecret, accessTokenLife);
        return res.status(200).json({
            status: "authorized",
            message: "User authorized.",
            data: {
                token: accessToken,
                user: user
            }
        });
    } else {
        return res.status(401).json({
            status: "unauthorized",
            message: "User unauthorized."
        });
    }
}

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: {
                errors: errors
            },
        });
    }
    const hash = await hashPassword(password);
    const existingUser = await prisma.user.findFirst({
        where: {
            username
        }
    });
    if (existingUser !== null) {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "error",
            message: "This user is existing."
        });
    }
    const uuid = uuidv4();
    const user = await prisma.user.create({
        data: {
            id: uuid,
            username: username,
            password: hash
        }
    });
    return res.status(statusCode.OK).json({
        status: "success",
        message: "User registered successfully.",
        data: user
    });
}

module.exports.refreshToken = async (req, res) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenFromHeader = req.headers.authorization;
    const verification = await verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (verification !== null) {
        const accessToken = await generateToken(verification.payload, accessTokenSecret, accessTokenLife);
        return res.status(statusCode.OK).json({
            status: "authorized",
            message: "User authorized.",
            data: {
                token: accessToken,
                user: verification.payload.user
            }
        });
    } else {
        return res.status(statusCode.BAD_REQUEST).json({
            status: "unauthorized",
            message: "Invalid token."
        });
    }
}