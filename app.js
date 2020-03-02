const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const { userRouter, playlistRouter } = require("./routes");
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
app.use(passport.initialize());
app.use("/users", userRouter);
app.use("/playlists", playlistRouter);

module.exports = app;
