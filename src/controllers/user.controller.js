const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
    const users = await prisma.user.findMany({});
    res.status(200).json({
        status: "success",
        message: "Get all users successfully.",
        data: users
    });
}

module.exports.findById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
        where: { id: parseInt(id) }
    });
    res.status(200).json({
        status: "success",
        message: "Get user by id successfully.",
        data: user
    })
}

module.exports.post = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    })
    res.status(200).json({
        status: "success",
        message: "Create user successfully."
    })
}

module.exports.put = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            password
        }
    });
    res.status(200).json({
        status: "success",
        message: "Update user successfully."
    });
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: { id: parseInt(id) }
    });
    res.send({
        status: "success",
        message: "Delete user successfully."
    });
}