const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment"
  },
  content: {
    type: String,
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    }
  ],
  likes: Number,
  Dislikes: Number
});

module.exports = mongoose.model("Video", videoSchema);
