const { Video } = require("../models");

exports.index = async (req, res) => {
  try {
    let videos = await Video.find();
    res.send(videos);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.create = async (req, res) => {
  try {
    let video = await Video.create({ ...req.body, owner: req.user._id });
    res.send({ success: true, video });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.delete = async (req, res) => {
  try {
    let video = await Video.findByIdAndDelete(req.params.id);
    res.send({ success: true, video });
  } catch (error) {
    res.status(400).send({ error });
  }
};
