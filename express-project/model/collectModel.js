const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const e = require("express");

// 收藏视频模型
const collectSchema = new mongoose.Schema({
  video: {
    type: mongoose.ObjectId,
    ref: "Video",
    required: true,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },

  ...baseModel,
});

module.exports = collectSchema;
