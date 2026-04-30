const mongoose = require("mongoose");
const md5 = require("md5");

// 定义用户模型
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = userSchema;
