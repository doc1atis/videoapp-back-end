const express = require("express");
const router = express.Router();
const { verifyUser } = require("../authenticate");
const { postController } = require("../controllers");

router.get("/", verifyUser, postController.index);
router.post("/", verifyUser, postController.create);
router.delete("/:id", verifyUser, postController.delete);

module.exports = router;
