const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");
const multer = require("multer");
const upload = multer({ dest: "public/" });

router
  .get("/getchannel", verifyToken(), userController.getchannel)
  .get("/getsubscribe/:userId", userController.getgetsubscribeuser)
  .get("/getuser/:userId", verifyToken(false), userController.getuser)
  .get("/subscribe/:userId", verifyToken(), userController.subscribe)
  .get("/unsubscribe/:userId", verifyToken(), userController.unsubscribe)
  .post("/register", userValidator.register, userController.register)
  .post("/login", userValidator.login, userController.login)
  .put("/", verifyToken(), userValidator.update, userController.update)
  .post(
    "/headimg",
    verifyToken(),
    upload.single("headimg"),
    userController.headimg,
  );

module.exports = router;
