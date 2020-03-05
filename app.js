const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  userRouter,
  playlistRouter,
  videoRouter,
  postRouter,
  commentRouter
} = require("./routes");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to server"), err => console.log(err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api/users", userRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/videos", videoRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
