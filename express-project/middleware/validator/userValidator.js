const { body, validationResult } = require("express-validator");
const validate = require("./errorBack");
const { User } = require("../../model");

module.exports.register = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .bail()
    .isLength({ min: 3 })
    .withMessage("用户名长度不能小于3位")
    .bail(),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .bail()
    .isEmail()
    .withMessage("邮箱格式错误")
    .bail()
    .custom(async (value) => {
      const emailValidate = await User.findOne({ email: value });
      if (emailValidate) {
        return Promise.reject("邮箱已存在");
      }
    })
    .bail(),
  body("phone")
    .notEmpty()
    .withMessage("手机号不能为空")
    .bail()
    .custom(async (value) => {
      const phoneValidate = await User.findOne({ phone: value });
      if (phoneValidate) {
        return Promise.reject("手机号已存在");
      }
    })
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .bail()
    .isLength({ min: 5 })
    .withMessage("密码长度不能小于5位")
    .bail(),
]);

module.exports.login = validate([
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .bail()
    .isEmail()
    .withMessage("邮箱格式错误")
    .bail()
    .custom(async (value) => {
      const emailValidate = await User.findOne({ email: value });
      if (!emailValidate) {
        return Promise.reject("邮箱未注册");
      }
    })
    .bail(),

  body("password").notEmpty().withMessage("密码不能为空").bail(),
]);

module.exports.update = validate([
  body("email")
    .isEmail()
    .withMessage("邮箱格式错误")
    .bail()
    .custom(async (value) => {
      const emailValidate = await User.findOne({ email: value });
      if (emailValidate) {
        return Promise.reject("邮箱已被注册");
      }
    })
    .bail(),
  body("username")
    .custom(async (value) => {
      const userValidate = await User.findOne({ username: value });
      if (userValidate) {
        return Promise.reject("用户名已被注册");
      }
    })
    .bail(),
  body("phone")
    .custom(async (value) => {
      const phoneValidate = await User.findOne({ phone: value });
      if (phoneValidate) {
        return Promise.reject("手机已被注册");
      }
    })
    .bail(),
]);
