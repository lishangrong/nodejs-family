const { User } = require("../model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.default");
const md5 = require("../util/md5");

module.exports.index = async (ctx, next) => {
  let user = await User.findById(ctx.params.userId);
  ctx.body = user;
};

// 注册
module.exports.register = async (ctx, next) => {
  const userModel = new User(ctx.request.body);
  const dbBack = await userModel.save();
  let user = dbBack.toJSON();
  // 在前端不给用户展示password字段
  delete user.password;
  ctx.status = 201;
  ctx.body = { user };
};

// 登录
module.exports.login = async (ctx, next) => {
  // dbUser 由 userValidator.login 中间件挂载，包含 password 字段
  const dbUser = ctx.state.dbUser;
  const { password } = ctx.request.body;

  // 验证密码
  if (md5(password) !== dbUser.password) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "密码错误" }] };
    return;
  }

  // 生成 token
  const token = jwt.sign({ userId: dbUser._id }, jwtSecret, {
    expiresIn: "7d",
  });

  let user = dbUser.toJSON();
  delete user.password;

  ctx.body = { user, token };
};

// 更新用户信息
module.exports.update = async (ctx, next) => {
  const userId = ctx.params.userId;
  const body = ctx.request.body;

  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  if (!user) {
    ctx.status = 404;
    ctx.body = { error: [{ msg: "用户不存在" }] };
    return;
  }

  ctx.body = { user };
};
