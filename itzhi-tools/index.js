// 这是包的入口文件

const date = require("./dateFormat.js");
const escape = require("./htmlEscape.js");

// 向外暴露需要的成员
module.exports = {
  ...date,
  ...escape,
};
