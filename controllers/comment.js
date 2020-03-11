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

exports.like = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.likes.includes(req.user._id)) {
      comment.likes.pull(req.user._id);
    } else {
      comment.likes.push(req.user._id);
      comment.dislikes.pull(req.user._id);
    }

    await comment.save();

    comment = await comment.populate("owner", "username").execPopulate();

    res.send(comment);
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.dislike = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.dislikes.includes(req.user._id)) {
      comment.dislikes.pull(req.user._id);
    } else {
      comment.dislikes.push(req.user._id);
      comment.likes.pull(req.user._id);
    }

    await comment.save();

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
