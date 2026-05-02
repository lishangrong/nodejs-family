const fs = require("fs");
const lodash = require("lodash");
const { promisify } = require("util");
const { User, Subscribe } = require("../model");
const { createToken } = require("../util/jwt");
const rename = promisify(fs.rename);

// 获取粉丝列表
exports.getchannel = async (req, res) => {
  let channellist = await Subscribe.find({
    channel: req.user.userInfo._id,
  }).populate("user");
  channellist = channellist.map((item) => {
    return lodash.pick(item.user, [
      "_id",
      "username",
      "email",
      "subscribeCount",
    ]);
  });
  res.status(200).json(channellist);
};
// 获取关注的频道列表
exports.getgetsubscribeuser = async (req, res) => {
  let subscribelist = await Subscribe.find({
    user: req.params.userId,
  }).populate("channel");
  subscribelist = subscribelist.map((item) => {
    return lodash.pick(item.channel, [
      "_id",
      "username",
      "email",
      "subscribeCount",
    ]);
  });
  res.status(200).json(subscribelist);
};

// 获取频道信息
exports.getuser = async (req, res) => {
  let isSubscribe = false;
  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user.userInfo._id,
    });
    if (record) {
      isSubscribe = true;
    } else {
      isSubscribe = false;
    }
  }

  const user = await User.findById(req.params.userId);
  user.isSubscribe = isSubscribe;
  // 在前端不给用户展示password字段
  res.status(200).json({
    ...lodash.pick(user, [
      "_id",
      "username",
      "email",
      "subscribeCount",
      "isSubscribe",
    ]),
  });
};

// 关注频道
exports.subscribe = async (req, res) => {
  const channelId = req.params.userId;
  // 当前登录用户
  const id = req.user.userInfo._id;
  if (id === channelId) {
    return res.status(401).json({ error: "不能订阅自己" });
  }
  // 检查是否已关注
  const subscribe = await Subscribe.findOne({
    user: id,
    channel: channelId,
  });
  if (subscribe) {
    return res.status(401).json({ error: "已订阅" });
  }
  // 关注
  await new Subscribe({
    user: id,
    channel: channelId,
  }).save();

  // 更新被关注数量
  const user = await User.findById(channelId);
  user.subscribeCount++;
  await user.save();
  // await User.findByIdAndUpdate(channelId, { $inc: { subscribeCount: 1 } });
  res.status(200).json({ msg: "订阅成功" });
};

// 取消关注频道
exports.unsubscribe = async (req, res) => {
  const channelId = req.params.userId;
  // 当前登录用户
  const id = req.user.userInfo._id;
  if (id === channelId) {
    return res.status(401).json({ error: "不能取订阅自己" });
  }

  // 检查是否已关注
  const record = await Subscribe.findOne({
    user: id,
    channel: channelId,
  });

  if (record) {
    await record.deleteOne();
    const user = await User.findById(channelId);
    user.subscribeCount--;
    await user.save();
    res.status(200).json({ msg: "取消订阅成功" });
  } else {
    return res.status(401).json({ error: "未订阅该频道" });
  }
};

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
