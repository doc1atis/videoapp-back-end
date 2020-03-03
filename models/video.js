const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  content: {
    type: String
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    }
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Video", videoSchema);
