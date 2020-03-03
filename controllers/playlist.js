const { Playlist } = require("../models");

exports.index = async (req, res) => {
  try {
    let playlists = await Playlist.find();
    res.send(playlists);
  } catch (error) {
    res.status(400).send({ err });
  }
};

exports.create = async (req, res) => {
  try {
    let playlist = await Playlist.create({ ...req.body, owner: req.user._id });
    res.send({ success: true, playlist });
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.delete = async (req, res) => {
  try {
    let playlist = await Playlist.findByIdAndDelete(req.params.id);
    res.send({ success: true, playlist });
  } catch (error) {
    res.status(400).send({ error });
  }
};
