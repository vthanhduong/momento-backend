require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../methods/auth.methods");
const prisma = new PrismaClient();

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
        where: { 
            username,
            password
        }
    });
    if (user !== null) {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const dataForAccessedUser = {
            username: username
        };
        const accessToken = await generateToken(dataForAccessedUser, accessTokenSecret, accessTokenLife);
        res.send({
            status: "success",
            message: "User authorized.",
            data: {
                token: accessToken,
                user: user
            }
        })
    } else {
        res.send({
            status: "failed",
            message: "User unauthorized."
        })
    }
}