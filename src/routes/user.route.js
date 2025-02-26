const controller = require("../controllers/user.controller");
const express = require("express");
const router = express();

router.get('/', controller.index);

router.post('/', (req, res) => {
    res.status(400).send({
        status: "success",
        message: "User created successfully."
    })
});

router.put('/', (req, res) => {
    res.status(400).send({
        status: "success",
        message: "User updated successfully."
    })
});

router.delete('/', (req, res) => {
    res.status(400).send({
        status: "success",
        message: "User deleted successfully."
    })
});

module.exports = router;