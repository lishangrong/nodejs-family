const mongoose = require("mongoose");
const baseModel = require("./baseModel");

// 定义视频模型
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  vodvideoId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  cover: {
    type: String,
    default: null,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  ...baseModel,
});

module.exports = videoSchema;
