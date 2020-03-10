const express = require("express");
const router = express.Router();
const { verifyUser } = require("../authenticate");
const { postController } = require("../controllers");

router.get("/", verifyUser, postController.index);
router.get("/:videoId", postController.getPostsByVideoId);
router.post("/", verifyUser, postController.create);
router.post("/like/:id", verifyUser, postController.like);
router.post("/dislike/:id", verifyUser, postController.dislike);
router.delete("/:id", verifyUser, postController.delete);

module.exports = router;
