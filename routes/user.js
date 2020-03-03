const express = require("express");
const router = express.Router();
const passport = require("passport");
const { verifyUser } = require("../authenticate");
const { userController } = require("../controllers");

router.get("/", verifyUser, userController.index);
router.post("/register", userController.register);
router.post("/login", passport.authenticate("local"), userController.login);
router.delete("/", userController.delete);
router.delete("/deleteUser", verifyUser, userController.deleteUser);

module.exports = router;
