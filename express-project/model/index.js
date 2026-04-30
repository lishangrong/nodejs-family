const mongoose = require("mongoose");

async function mian() {
  await mongoose.connect("mongodb://127.0.0.1:27017/repress-video");
}

mian()
  .then((res) => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongo connection failed");
  })
  .finally(() => {
    // mongoose.disconnect();
  });

module.exports = {
  User: mongoose.model("User", require("./userModel")),
};
