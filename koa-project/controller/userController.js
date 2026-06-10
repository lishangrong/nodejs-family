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
  delete user.password;
  ctx.status = 201;
  ctx.body = { user };
};

// 登录
module.exports.login = async (ctx, next) => {
  const { email, password } = ctx.request.body;

  // 查询用户（包含密码字段）
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: "邮箱或密码错误" };
    return;
  }

  // 验证密码
  if (user.password !== md5(password)) {
    ctx.status = 401;
    ctx.body = { error: "邮箱或密码错误" };
    return;
  }

  // 生成 token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    jwtSecret,
    { expiresIn: "24h" }
  );

  // 返回用户信息和 token
  const userInfo = user.toJSON();
  delete userInfo.password;

  ctx.body = {
    user: userInfo,
    token,
  };
};

// 更新用户
module.exports.update = async (ctx, next) => {
  const userId = ctx.params.userId;
  const updateData = ctx.request.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "用户不存在" };
      return;
    }

    ctx.body = { user };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err.message };
  }
};
