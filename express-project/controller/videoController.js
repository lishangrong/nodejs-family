const { Video, Videocomment, Videolike, Subscribe } = require("../model");

exports.videolist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;
  let geVideo = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id, username, email");
  const videoCount = await Video.countDocuments();
  res.status(200).json({ videlist: geVideo, videoCount });
};
// 获取视频详情
exports.video = async (req, res) => {
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId).populate(
    "user",
    "_id, username, email",
  );
  videoInfo.islike = false;
  videoInfo.isDislike = false;
  videoInfo.isSubscribe = false;
  if (req.user.userInfo) {
    const userId = req.user.userInfo._id;
    const like = await Videolike.findOne({
      like: 1,
      user: userId,
      video: videoId,
    });
    const dislike = await Videolike.findOne({
      like: -1,
      user: userId,
      video: videoId,
    });
    const subscribe = await Subscribe.findOne({
      user: userId,
      channel: videoInfo.user._id,
    });
    videoInfo.islike = like ? true : false;
    videoInfo.isDislike = dislike ? true : false;
    videoInfo.isSubscribe = subscribe ? true : false;
  }

  res.status(200).json(videoInfo);
};

exports.createVideo = async (req, res) => {
  try {
    let body = req.body;
    body.user = req.user.userInfo._id;
    const videoModel = new Video(body);
    const dbBack = await videoModel.save();
    let video = dbBack.toJSON();
    res.status(201).json({ video });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// 评论视频
exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const comment = await new Videocomment({
    content: req.body.content,
    video: videoId,
    user: req.user.userInfo._id,
  }).save();

  videoInfo.commentCount++;
  await videoInfo.save();

  res.status(201).json(comment);
};

// 获取评论列表
exports.commentlist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;
  const { videoId } = req.params;
  const commentList = await Videocomment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id, username, email");
  const totalCount = await Videocomment.countDocuments({ video: videoId });
  res.status(200).json({ commentlist: commentList, totalCount });
};

// 删除评论
exports.deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const comment = await Videocomment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: "评论不存在" });
  }
  if (!comment.user.equals(req.user.userInfo._id)) {
    return res.status(403).json({ error: "您没有权限删除该评论" });
  }
  await comment.deleteOne();
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ message: "评论删除成功" });
};

exports.like = async (req, res) => {
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const userId = req.user.userInfo._id;
  const record = await Videolike.findOne({
    video: videoId,
    user: userId,
  });
  let isLike = true;
  if (record && record.like === 1) {
    await record.deleteOne();
    isLike = false;
  } else if (record && record.like === -1) {
    record.like = 1;
    record.save();
  } else {
    const like = await new Videolike({
      like: 1,
      video: videoId,
      user: userId,
    }).save();
  }

  videoInfo.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1,
  });
  videoInfo.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1,
  });
  await videoInfo.save();
  res.status(200).json({ video: videoInfo, isLike });
};

exports.dislike = async (req, res) => {
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: "视频不存在" });
  }
  const userId = req.user.userInfo._id;
  const record = await Videolike.findOne({
    video: videoId,
    user: userId,
  });
  let isDislike = true;
  if (record && record.like === -1) {
    await record.deleteOne();
    isDislike = false;
  } else if (record && record.like === 1) {
    record.like = -1;
    record.save();
  } else {
    await new Videolike({
      like: -1,
      video: videoId,
      user: userId,
    }).save();
  }
  videoInfo.likeCount = await Videolike.countDocuments({
    video: videoId,
    like: 1,
  });
  videoInfo.dislikeCount = await Videolike.countDocuments({
    video: videoId,
    like: -1,
  });
  await videoInfo.save();
  res.status(200).json({ video: videoInfo, isDislike });
};

// 获取点赞列表
exports.likeList = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  let likes = await Videolike.find({ like: 1, user: req.user.userInfo._id })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate("video", "_id, title, vodvideoId");
  const totalCount = await Videolike.countDocuments({
    like: 1,
    user: req.user.userInfo._id,
  });

  res.status(200).json({ likes, totalCount });
};
