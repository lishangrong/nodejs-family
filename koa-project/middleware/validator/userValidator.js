const Joi = require("joi");
const { User } = require("../../model");

const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .messages({
      "any.required": "用户名不能为空",
      "string.empty": "用户名不能为空",
      "string.min": "用户名长度不能小于3位",
    }),
  email: Joi.string()
    .required()
    .email()
    .messages({
      "any.required": "邮箱不能为空",
      "string.empty": "邮箱不能为空",
      "string.email": "邮箱格式错误",
    }),
  phone: Joi.string()
    .required()
    .pattern(/^1[3-9]\d{9}$/)
    .messages({
      "any.required": "手机号不能为空",
      "string.empty": "手机号不能为空",
      "string.pattern.base": "手机号格式错误",
    }),
  password: Joi.string()
    .required()
    .min(5)
    .messages({
      "any.required": "密码不能为空",
      "string.empty": "密码不能为空",
      "string.min": "密码长度不能小于5位",
    }),
});

module.exports.register = async (ctx, next) => {
  // 基本格式校验
  const { error } = registerSchema.validate(ctx.request.body, {
    abortEarly: true,
  });
  if (error) {
    ctx.status = 401;
    ctx.body = { error: error.details.map((e) => ({ msg: e.message })) };
    return;
  }

  const { email, phone } = ctx.request.body;

  // 邮箱唯一性校验
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "邮箱已存在" }] };
    return;
  }

  // 手机号唯一性校验
  const phoneExists = await User.findOne({ phone });
  if (phoneExists) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "手机号已存在" }] };
    return;
  }

  await next();
};

// 登录校验
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({
      "any.required": "邮箱不能为空",
      "string.empty": "邮箱不能为空",
      "string.email": "邮箱格式错误",
    }),
  password: Joi.string()
    .required()
    .min(5)
    .messages({
      "any.required": "密码不能为空",
      "string.empty": "密码不能为空",
      "string.min": "密码长度不能小于5位",
    }),
});

module.exports.login = async (ctx, next) => {
  const { error } = loginSchema.validate(ctx.request.body, {
    abortEarly: true,
  });
  if (error) {
    ctx.status = 401;
    ctx.body = { error: error.details.map((e) => ({ msg: e.message })) };
    return;
  }

  const { email } = ctx.request.body;

  // 邮箱存在性校验
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "邮箱未注册" }] };
    return;
  }

  // 将用户信息挂载到 ctx.state 供 controller 使用
  ctx.state.dbUser = user;
  await next();
};

// 更新校验
const updateSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({
      "any.required": "邮箱不能为空",
      "string.empty": "邮箱不能为空",
      "string.email": "邮箱格式错误",
    }),
  username: Joi.string().optional(),
  phone: Joi.string().optional(),
}).unknown(true);

module.exports.update = async (ctx, next) => {
  const { error } = updateSchema.validate(ctx.request.body, {
    abortEarly: true,
  });
  if (error) {
    ctx.status = 401;
    ctx.body = { error: error.details.map((e) => ({ msg: e.message })) };
    return;
  }

  const userId = ctx.params.userId;
  const { email, username, phone } = ctx.request.body;

  // 邮箱唯一性校验（排除当前用户）
  if (email) {
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      ctx.status = 401;
      ctx.body = { error: [{ msg: "邮箱已存在" }] };
      return;
    }
  }

  // 用户名唯一性校验（排除当前用户）
  if (username) {
    const usernameExists = await User.findOne({ username, _id: { $ne: userId } });
    if (usernameExists) {
      ctx.status = 401;
      ctx.body = { error: [{ msg: "用户名已存在" }] };
      return;
    }
  }

  // 手机号唯一性校验（排除当前用户）
  if (phone) {
    const phoneExists = await User.findOne({ phone, _id: { $ne: userId } });
    if (phoneExists) {
      ctx.status = 401;
      ctx.body = { error: [{ msg: "手机号已存在" }] };
      return;
    }
  }

  await next();
};
