const { Post } = require("../models");

exports.index = async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.getPostsByVideoId = async (req, res) => {
  try {
    let posts = await Post.find({ videoId: req.params.videoId })
      .populate("owner", "username")
      .populate({
        path: "comments",
        populate: {
          path: "owner",
          select: "username"
        }
      })
      .exec();
    res.send(posts);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.create = async (req, res) => {
  try {
    let post = await Post.create({ ...req.body, owner: req.user._id });

    post = await post.populate("owner", "username").execPopulate();

    console.log(post);

    res.send(post);
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

exports.like = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
      post.dislikes.pull(req.user._id);
    }

    await post.save();

    post = await post
      .populate("owner ", "username")
      .populate({
        path: "comments",
        populate: {
          path: "owner",
          select: "username"
        }
      })
      .execPopulate();

    res.send(post);
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.dislike = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.dislikes.includes(req.user._id)) {
      post.dislikes.pull(req.user._id);
    } else {
      post.dislikes.push(req.user._id);
      post.likes.pull(req.user._id);
    }

    await post.save();

    post = await post
      .populate("owner ", "username")
      .populate({
        path: "comments",
        populate: {
          path: "owner",
          select: "username"
        }
      })
      .execPopulate();

    res.send(post);
  } catch (error) {
    res.status(400).send({ error });
  }
};
