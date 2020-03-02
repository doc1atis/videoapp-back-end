const User = require("../models/user");
const passport = require("passport");
const authenticate = require("../authenticate");

exports.index = async (req, res) => {
  let users = await User.find();
  res.send(users);
};

exports.delete = async (req, res) => {
  try {
    await User.deleteMany();
    res.send();
  } catch (error) {
    res.send({ error });
  }
};

exports.register = async (req, res) => {
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
            const token = authenticate.getToken({ _id: req.user._id });
            res.send({
              success: true,
              status: "registration successful",
              token
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
};

exports.login = (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.send({ success: true, token });
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (err) {
    res.send({ err });
  }
};
