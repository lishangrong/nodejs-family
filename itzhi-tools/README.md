## 安装

```bash
npm install itzhi-tools
```

## 导入

```javascript
const tools = require("itzhi-tools");
```

## 格式化时间

```javascript
const dtStr = tools.dateFormat(new Date());
// 结果  2026-05-09 16:44:54
console.log(dtStr);
```

## 转义HTML 中的特殊字符

```javascript
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>';
const escapedHtml = tools.htmlEscape(htmlStr);
// 结果  &lt;h1 title="abc"&gt;这是h1标签&lt;span title="abc"&gt;123&nbsp;&lt;/span&gt;&lt;/h1&gt;
console.log(escapedHtml);
```

## 反转义HTML 中的特殊字符

```javascript
const unescapedHtml = tools.htmlUnescape(escapedHtml);
// 结果  <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>
console.log(unescapedHtml);
```

## 开源协议

ISC
