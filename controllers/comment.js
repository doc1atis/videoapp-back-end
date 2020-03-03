const { Comment } = require("../models");

exports.index = async (req, res) => {
  try {
    let comments = await Comment.find();
    res.send(comments);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.create = async (req, res) => {
  try {
    let comment = await Comment.create({ ...req.body, owner: req.user._id });
    res.send({ success: true, comment });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findByIdAndDelete(req.params.id);
    res.send({ success: true, comment });
  } catch (error) {
    res.status(400).send({ error });
  }
};
