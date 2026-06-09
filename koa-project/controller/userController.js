const { User } = require("../model");

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
