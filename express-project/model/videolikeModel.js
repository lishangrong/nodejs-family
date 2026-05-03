const mongoose = require("mongoose");
const baseModel = require("./baseModel");
const e = require("express");

// 定义视频点赞模型
const videolikeSchema = new mongoose.Schema({
  like: {
    type: Number,
    enum: [1, -1], // 1 表示点赞，-1 表示不喜欢
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

module.exports = videolikeSchema;
