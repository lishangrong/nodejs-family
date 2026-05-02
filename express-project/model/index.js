const mongoose = require("mongoose");
const { mongoPath } = require("../config/config.default");

async function mian() {
  await mongoose.connect(mongoPath);
}

mian()
  .then((res) => {
    console.log("mongo 连接成功");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongo 连接失败");
  });

module.exports = {
  User: mongoose.model("User", require("./userModel")),
  Video: mongoose.model("Video", require("./videoModel")),
  Subscribe: mongoose.model("Subscribe", require("./subscribeMode")),
  Videocomment: mongoose.model("Videocomment", require("./videocommentModel")),
};
