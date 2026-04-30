const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const tojwt = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const { uuid } = require("../config/config.default.js");

// 创建token
module.exports.createToken = async (userInfo) => {
  const token = await tojwt({ userInfo }, uuid, {
    expiresIn: 60 * 60,
  });
  return token;
};

// 验证token
module.exports.verifyToken = async (req, res, next) => {
  console.log(req.headers);
  let token = req.headers.authorization;
  token = token ? token.split("Bearer ")[1] : null;
  if (!token) {
    return res.status(402).json({ error: "请传入token" });
  }
  try {
    const info = await verify(token, uuid);
    req.user = info;
    next();
  } catch (error) {
    res.status(402).json({ error: "无效的token" });
  }
};
