const express = require("express");
const router = express.Router();
const { verifyUser } = require("../authenticate");
const { commentController } = require("../controllers");

router.get("/", verifyUser, commentController.index);
router.post("/", verifyUser, commentController.create);
router.post("/like/:id", verifyUser, commentController.like);
router.post("/dislike/:id", verifyUser, commentController.dislike);
router.delete("/:id", verifyUser, commentController.delete);

module.exports = router;
