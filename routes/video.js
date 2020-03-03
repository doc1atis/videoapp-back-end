const express = require("express");
const router = express.Router();
const { verifyUser } = require("../authenticate");
const { videoController } = require("../controllers");

router.get("/", verifyUser, videoController.index);
router.post("/", verifyUser, videoController.create);
router.delete("/:id", verifyUser, videoController.delete);

module.exports = router;
