const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticate = require("../authenticate");
const passport = require("passport");

router.get("/", (req, res) => res.send("hi"));

router.post("/register", async (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password,
    async (err, user) => {
      if (err) {
        res.status(400).send({ err });
      } else {
        try {
          await user.save();
          passport.authenticate("local")(req, res, () => {
            res.send({
              success: true,
              status: "registration successful",
              user
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
});

module.exports = router;
