const { redis } = require("./index");

// 热度增长
exports.hotInc = async (videoId, incNum) => {
  let data = await redis.zscore("videohots", videoId);
  let inc;
  if (data) {
    inc = await redis.zincrby("videohots", incNum, videoId);
  } else {
    inc = await redis.zadd("videohots", incNum, videoId);
  }

  return inc;
};

// 热门视频排行列表
exports.topHots = async (num) => {
  const data = await redis.zrevrange("videohots", 0, -1, "withscores");
  const result = data.slice(0, num * 2);
  let obj = {};
  for (let i = 0; i < result.length; i++) {
    if (i % 2 === 0) {
      obj[result[i]] = result[i + 1];
    }
  }
  return obj;
};
