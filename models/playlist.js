const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User"
  },
  videos: [
    {
      type: Schema.ObjectId,
      ref: "Video"
    }
  ]
});

module.exports = mongoose.model("Playlist", playlistSchema);
