// 定义一个HTMLEscape的函数
function htmlEscape(htmlStr) {
  return htmlStr.replace(/<|>|"|&/g, (match) => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "&":
        return "&amp;";
      default:
        return match;
    }
  });
}

// 定义还原 HTML 字符串的函数
function htmlUnescape(htmlescapedStr) {
  return htmlescapedStr.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
    switch (match) {
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&quot;":
        return '"';
      case "&amp;":
        return "&";
      default:
        return match;
    }
  });
}

module.exports = {
  htmlEscape,
  htmlUnescape,
};
