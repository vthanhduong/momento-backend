const { verifyToken } = require("../methods/auth.methods");

require("dotenv").config();

exports.isAuthorized = async (req, res, next) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).json({
            status: "unauthorized",
            message: "Access token is missing.",
        });
    } else {
        const verification = await verifyToken(accessTokenFromHeader, accessTokenSecret)
        if (verification == null) {
            return res.status(401).json({
                status: "unauthorized",
                message: "Access token is expired or invalid.",
            });
        }
    }
    return next();
}

exports.isGoldMember = async (req, res, next) => {
    // ready to implement
    return next();
}