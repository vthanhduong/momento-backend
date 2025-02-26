const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports.index = async (req, res) => {
    const users = await prisma.user.findMany({});
    res.send(users);
}