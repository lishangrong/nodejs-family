const { User } = require("../model");
const jwt = require("jsonwebtoken");
const { createToken } = require("../util/jwt");
// 注册
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  res.status(201).json(dbBack);
};
// 登录
exports.login = async (req, res) => {
  // console.log(req.body);
  // 客户端输入验证
  // 链接数据库查询
  let dbBack = await User.findOne(req.body);
  if (!dbBack) {
    return res.status(402).json({ error: "邮箱或者密码不正确" });
  }

  dbBack = dbBack.toJSON();
  dbBack.token = await createToken(dbBack);
  res.status(200).json(dbBack);
};
exports.list = async (req, res) => {
  console.log(res.method);
  res.send("/user-list");
};
exports.users = async (req, res) => {
  res.send("/users");
};

exports.delete = async (req, res) => {
  res.send("/delete");
};
