const express = require("express");
const router = express.Router();
const { verifyUser } = require("../authenticate");
const { playlistController } = require("../controllers");

router.get("/", verifyUser, playlistController.index);
router.post("/", verifyUser, playlistController.create);
router.delete("/:id", verifyUser, playlistController.delete);

module.exports = router;
