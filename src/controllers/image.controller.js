const cloudinary = require("cloudinary").v2;
const busboy = require("busboy");

require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

module.exports.upload = async (req, res) => {
    try {
        const contentType = req.headers["content-type"];
        if (!contentType || !contentType.includes("multipart/form-data")) {
            res.status(400).json({
                status: "unsuccess",
                message: "Unsupport content type."
            });
        }
        const bb = busboy({ headers: req.headers });
        bb.on("file", (name, stream, info) => {
            try {
                const { fileName, mimeType } = info;
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "momento-archive",
                    resource_type: "auto"
                }, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            status: "unsuccess",
                            message: "An error occurred."
                        });
                    }
                    res.status(200).json({
                        status: "success",
                        message: "Upload image successfully.",
                        data: {
                            url: result.secure_url
                        }
                    });
                });
                stream.pipe(uploadStream);
            } catch (err) {
                res.status(400).json({
                    status: "unsuccess",
                    message: "An error occurred."
                });
            }
        });
        bb.on("finish", () => {});
        req.pipe(bb);
    } catch (err) {
        res.status(400).json({
            status: "unsuccess",
            message: "An error occurred."
        });
    }
}