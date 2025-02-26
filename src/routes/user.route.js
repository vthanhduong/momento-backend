const controller = require("../controllers/user.controller");
const express = require("express");
const router = express();

router.get('/', controller.index);
router.get('/:id', controller.findById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;