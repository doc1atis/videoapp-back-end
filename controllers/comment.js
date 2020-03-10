const { Comment, Post } = require("../models");

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
    let comment = await Comment.create({
      ...req.body,
      post: req.body.postId,
      owner: req.user._id
    });

    let post = await Post.findByIdAndUpdate(
      comment.post,
      { $push: { comments: comment._id } },
      { new: true }
    );

    comment = await comment.populate("owner", "username").execPopulate();

    res.send(comment);
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findByIdAndDelete(req.params.id);

    let post = await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id }
    });

    res.send(comment);
  } catch (error) {
    res.status(400).send({ error });
  }
};
