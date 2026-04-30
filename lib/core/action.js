const inquirer = require("inquirer");
const config = require("../config");
const downloadFn = require("./download.js");

const myAction = async function (project, args) {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "framwork",
      choices: config.framwork,
      message: "请选择你所使用的框架",
    },
  ]);

  // 下载代码
  downloadFn(config.framworkUrl[answer.framwork], project);
};

module.exports = myAction;
