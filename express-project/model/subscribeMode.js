const mongoose = require("mongoose");
const baseModel = require("./baseModel");

// 定义关注模型
const subscribeSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  channel: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  ...baseModel,
});

module.exports = subscribeSchema;
