require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { generateToken, hashPassword, checkPassword } = require("../methods/auth.methods");
const { validationResult } = require('express-validator');
const statusCode = require('../utils/http-status-code.const');
const prisma = new PrismaClient();

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
            username: username
        };
        const accessToken = await generateToken(dataForAccessedUser, accessTokenSecret, accessTokenLife);
        return res.status(200).json({
            status: "success",
            message: "User authorized.",
            data: {
                token: accessToken,
                user: user
            }
        })
    } else {
        return res.status(401).json({
            status: "unsuccess",
            message: "User unauthorized."
        })
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
    const user = await prisma.user.create({
        data: {
            username: username,
            password: hash
        }
    });
    return res.status(200).json({
        status: "success",
        message: "User registered successfully."
    });
}