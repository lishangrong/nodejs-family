const mongoose = require("mongoose");
const baseModel = require("./baseModel");

// 定义视频评论模型
const videocommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
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

module.exports = videocommentSchema;
