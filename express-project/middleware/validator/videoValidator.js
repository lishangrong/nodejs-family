const { body, validationResult } = require("express-validator");
const validate = require("./errorBack");

module.exports.create = validate([
  body("title").notEmpty().withMessage("视频标题不能为空").bail(),
  body("vodvideoId").notEmpty().withMessage("Vod不能为空").bail(),
]);
