const express = require("express");
const router = express();

router.get('/', (req, res) => {
    res.status(400).send({
        status: "success",
        data: [
            {
                id: 1,
                username: "fuckyou"
            }
        ]
    })
});

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