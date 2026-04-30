const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");

router.get("/list", videoController.list).get("/video", videoController.video);

module.exports = router;
