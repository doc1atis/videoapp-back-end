const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
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
    ],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", commentSchema);
