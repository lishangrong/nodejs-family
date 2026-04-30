const ora = require("ora");
// const spinner = ora("Loading unicorns").start();
const spinner = ora().start();
spinner.text = "Loading ....";

setTimeout(() => {
  console.log(111);
  // spinner.succeed("结束");
  // spinner.fail("失败");
  spinner.info("信息");
}, 3000);
