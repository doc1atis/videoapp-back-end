const { Post } = require("../models");

exports.index = async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.create = async (req, res) => {
  try {
    let post = await Post.create({ ...req.body, owner: req.user._id });
    res.send({ success: true, post });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.delete = async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);
    res.send({ success: true, post });
  } catch (error) {
    res.status(400).send({ error });
  }
};