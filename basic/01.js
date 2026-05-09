const itheimaTools = require("../itheima-tools");

console.log("---------------");
const dtStr = itheimaTools.dateFormat(new Date());
console.log(dtStr);

console.log("---------------");

const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>';
const escapedHtml = itheimaTools.htmlEscape(htmlStr);
console.log(escapedHtml);

console.log("---------------");

const unescapedHtml = itheimaTools.htmlUnescape(escapedHtml);
console.log(unescapedHtml);
console.log("---------------");
