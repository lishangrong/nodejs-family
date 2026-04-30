const downloadGitRepo = require("download-git-repo");

downloadGitRepo(
  "direct:git@gitee.com:beiyaoyaoyao/egg-template.git",
  "./xxxx",
  { clone: true },
  (err) => {
    console.log(err);
  },
);
