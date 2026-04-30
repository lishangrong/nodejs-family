const fs = require("fs");
const { promisify } = require("util");
const { User } = require("../model");
const { createToken } = require("../util/jwt");
const rename = promisify(fs.rename);
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

// 更新用户信息
exports.update = async (req, res) => {
  const id = req.user.userInfo._id;
  // 返回更新后的结果
  const dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ user: dbBack });
};

// 用户头像上传
exports.headimg = async (req, res) => {
  const fileArr = req.file.originalname.split(".");
  const filetype = fileArr[fileArr.length - 1];
  const filename = req.file.filename + "." + filetype;

  try {
    await rename("./public/" + req.file.filename, "./public/" + filename);
    res.status(201).json({ filepath: filename });
  } catch (error) {
    res.status(500).json({ error });
  }
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
