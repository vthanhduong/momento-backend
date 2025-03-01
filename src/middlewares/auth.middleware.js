exports.isAuthorized = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).json({
            status: "access token is missing",
            message: "Unauthorized.",
        });
    }
    return next();
}