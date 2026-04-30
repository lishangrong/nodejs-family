exports.list = async (req, res) => {
  console.log(res.method);
  res.send("/list");
};
exports.video = async (req, res) => {
  res.send("/video");
};
