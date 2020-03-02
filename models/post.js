const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  likes: Number,
  dislikes: Number,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Video", postSchema);
