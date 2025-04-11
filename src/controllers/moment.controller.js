const cloudinary = require("cloudinary").v2;
const busboy = require("busboy");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const { verifyToken } = require("../methods/auth.methods");
const statusCode = require("../utils/http-status-code.const");
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.upload = async (req, res) => {
    try {
        const contentType = req.headers["content-type"];
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return res.status(400).json({
                status: "error",
                message: "Unsupport content type."
            });
        }
        let fileReceived = false;
        const bb = busboy({ headers: req.headers });
        bb.on("file", (name, stream, info) => {
            try {
                fileReceived = true;
                const { fileName, mimeType } = info;
                if (name === "file" && (mimeType === "image/jpg" || mimeType === "image/jpeg" || mimeType === "image/png")) {
                    const uploadStream = cloudinary.uploader.upload_stream({
                        folder: "momento-archive",
                        resource_type: "auto"
                    }, async (err, result) => {
                        if (err) {
                            return res.status(400).json({
                                status: "error",
                                message: "An error occurred."
                            });
                        }
                        const uuid = uuidv4();
                        const verificationToken = await verifyToken(req.headers.authorization, accessTokenSecret);
                        const moment = await prisma.moment.create({
                            data: {
                                id: uuid,
                                userId: verificationToken.payload.user.id,
                                url: result.secure_url,
                            }
                        });
                        return res.status(200).json({
                            status: "success",
                            message: "Upload moment successfully.",
                            data: moment,
                        });
                    });
                    stream.pipe(uploadStream);
                } else {
                    return res.status(statusCode.BAD_REQUEST).json({
                        status: "error",
                        message: "File must be an image with these extensions: '.jpg', '.jpeg', '.png'"
                    });
                }
            } catch (err) {
                return res.status(400).json({
                    status: "error",
                    message: "An error occurred."
                });
            }
        });
        bb.on("finish", () => {
            if (!fileReceived) {
                return res.status(400).json({
                    status: "error",
                    message: "File doesn't contain anything."
                });
            }
        });
        req.pipe(bb);
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: "An error occurred."
        });
    }
}

module.exports.getSelfMoments = async (req, res) => {
    const verificationToken = await verifyToken(req.headers.authorization, accessTokenSecret);
    const selfMoments = await prisma.moment.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            }
        ],
        where: {
            userId: verificationToken.payload.user.id
        }
    });
    return res.status(200).json({
        status: "success",
        message: "Get self moments successfully.",
        data: selfMoments,
    });
}