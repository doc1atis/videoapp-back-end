const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
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
    videoId: {
      type: String,
      required: true
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", postSchema);
