const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  playlist: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "PlayList"
    }
  ],
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
