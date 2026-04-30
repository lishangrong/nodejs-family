const download = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");

const downloadFn = function (url, project) {
  const spinner = ora().start();
  spinner.text = "代码正在下载......";
  // 下载代码
  download("direct:" + url, project, { clone: true }, (err) => {
    console.log(err);
    if (err) {
      spinner.fail("代码下载失败", err);
    } else {
      spinner.succeed("代码下载成功");
      console.log(chalk.green.bold("done! you run:"));
      console.log(chalk.green("cd " + project));
      console.log(chalk.green("npm install"));
      console.log(chalk.green("npm run dev"));
    }
  });
};

module.exports = downloadFn;
