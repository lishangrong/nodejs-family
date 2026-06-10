const { User } = require("../model");

// 注册数据校验
exports.validateRegister = async (ctx, next) => {
  const errors = [];
  const { username, email, phone, password } = ctx.request.body;

  // username 校验
  if (!username) {
    errors.push({ msg: "用户名不能为空" });
  } else if (username.length < 3) {
    errors.push({ msg: "用户名长度不能小于3位" });
  }

  // email 校验
  if (!email) {
    errors.push({ msg: "邮箱不能为空" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ msg: "邮箱格式错误" });
  } else {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      errors.push({ msg: "邮箱已存在" });
    }
  }

  // phone 校验
  if (!phone) {
    errors.push({ msg: "手机号不能为空" });
  } else if (!/^1[3-9]\d{9}$/.test(phone)) {
    errors.push({ msg: "手机号格式错误" });
  } else {
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      errors.push({ msg: "手机号已存在" });
    }
  }

  // password 校验
  if (!password) {
    errors.push({ msg: "密码不能为空" });
  } else if (password.length < 5) {
    errors.push({ msg: "密码长度不能小于5位" });
  }

  if (errors.length > 0) {
    ctx.status = 401;
    ctx.body = { errors };
    return;
  }

  await next();
};

// 登录数据校验
exports.validateLogin = async (ctx, next) => {
  const errors = [];
  const { email, password } = ctx.request.body;

  // email 校验
  if (!email) {
    errors.push({ msg: "邮箱不能为空" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ msg: "邮箱格式错误" });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: "邮箱不存在" });
    }
  }

  // password 校验
  if (!password) {
    errors.push({ msg: "密码不能为空" });
  } else if (password.length < 5) {
    errors.push({ msg: "密码长度不能小于5位" });
  }

  if (errors.length > 0) {
    ctx.status = 401;
    ctx.body = { errors };
    return;
  }

  await next();
};

// 更新用户数据校验
exports.validateUpdate = async (ctx, next) => {
  const errors = [];
  const { email, username, phone } = ctx.request.body;
  const userId = ctx.params.userId;

  // email 校验
  if (email !== undefined) {
    if (!email) {
      errors.push({ msg: "邮箱不能为空" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ msg: "邮箱格式错误" });
    } else {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        errors.push({ msg: "邮箱已被其他用户使用" });
      }
    }
  }

  // username 校验
  if (username !== undefined) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists && usernameExists._id.toString() !== userId) {
      errors.push({ msg: "用户名已被其他用户使用" });
    }
  }

  // phone 校验
  if (phone !== undefined) {
    const phoneExists = await User.findOne({ phone });
    if (phoneExists && phoneExists._id.toString() !== userId) {
      errors.push({ msg: "手机号已被其他用户使用" });
    }
  }

  if (errors.length > 0) {
    ctx.status = 401;
    ctx.body = { errors };
    return;
  }

  await next();
};
