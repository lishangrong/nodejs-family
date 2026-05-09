// 定义格式化时间的函数
function dateFormat(dateStr) {
  const dt = new Date(dateStr);

  const y = dt.getFullYear();
  const m = padZero(dt.getMonth() + 1);
  const d = padZero(dt.getDate());

  const hh = padZero(dt.getHours());
  const mm = padZero(dt.getMinutes());
  const ss = padZero(dt.getSeconds());

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

// 定义一个补0的函数
function padZero(num) {
  return num < 10 ? "0" + num : num;
}

module.exports = {
  dateFormat,
};
