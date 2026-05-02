const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");
const vodController = require("../controller/vodController");
const { verifyToken } = require("../util/jwt");
const videoValidator = require("../middleware/validator/videoValidator");

router
  .get("/videolist", videoController.videolist)
  .get("/getvod", verifyToken(), vodController.getvod)
  .get("/video/:videoId", verifyToken(), videoController.video)
  .post(
    "/createvideo",
    verifyToken(),
    videoValidator.create,
    videoController.createVideo,
  )
  .post("/comment/:videoId", verifyToken(), videoController.comment)
  .get("/commentlist/:videoId", videoController.commentlist)
  .delete(
    "/comment/:videoId/:commentId",
    verifyToken(),
    videoController.deleteComment,
  );

module.exports = router;
