const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.default");

module.exports.auth = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "请提供有效的Token" }] };
    return;
  }

  const token = authHeader.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: [{ msg: "Token无效或已过期" }] };
  }
};
