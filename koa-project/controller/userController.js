const { User } = require("../model");

module.exports.index = async (ctx, next) => {
  let user = await User.findById(ctx.params.userId);
  ctx.body = user;
};
