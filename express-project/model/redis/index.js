const ioredis = require("ioredis");
const redis = new ioredis();

// 出发错误事件
redis.on("error", (err) => {
  if (err) {
    console.log("redis 链接错误");
    console.log(err);
    redis.quit();
  }
});

redis.on("ready", () => {
  console.log("redis 链接成功");
});

exports.redis = redis;
