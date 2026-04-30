const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "请输入您的姓名",
    },
  ])
  .then((answers) => {
    console.log(answers);
  });
