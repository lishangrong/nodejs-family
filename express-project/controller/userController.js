const { User } = require("../model");
const { createToken } = require("../util/jwt");
// 注册
exports.register = async (req, res) => {
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  let user = dbBack.toJSON();
  // 在前端不给用户展示password字段
  delete user.password;
  res.status(201).json({ user });
};
// 登录
exports.login = async (req, res) => {
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
