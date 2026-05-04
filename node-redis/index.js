const ioredis = require("ioredis");
const redis = new ioredis();
let num = Math.round(Math.random() * 30 + 1);
let str = "abcdefghijklmnopqw";
let strtap = Math.round(Math.random() * str.length);
let key = str.substring(0, strtap);

async function jihe() {
  let data = await redis.zscore("hots", str[strtap]);
  if (data) {
    await redis.zincrby("hots", 1, str[strtap]);
    console.log(str[strtap] + "+1");
  } else {
    await redis.zadd("hots", num, str[strtap]);
    console.log(str[strtap] + "添加成功");
  }

  let paixu = await redis.zrevrange("hots", 0, -1, "withscores");
  // console.log(paixu);
  let obj = {};
  for (let i = 0; i < paixu.length; i++) {
    if (i % 2 == 0) {
      obj[paixu[i]] = paixu[i + 1];
    }
  }
  console.log(obj);
}

jihe();

// redis.keys("*").then((res) => console.log(res));
