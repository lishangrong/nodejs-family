/**
 * 默认配置
 */

const { options } = require("../model/collectModel");

module.exports.uuid = "6fb4cdc0-7882-4fca-a724-56f5dd197c05";

module.exports.mongoPath = "mongodb://127.0.0.1:27017/repress-video";

module.exports.redisClient = {
  path: "192.168.0.106",
  port: 6379,
  options: {
    password: "root",
  },
};
