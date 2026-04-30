const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");
const multer = require("multer");
const upload = multer({ dest: "public/" });

router
  .post("/register", userValidator.register, userController.register)
  .post("/login", userValidator.login, userController.login)
  .get("/list", verifyToken, userController.list)
  .put("/", verifyToken, userValidator.update, userController.update)
  .post(
    "/headimg",
    verifyToken,
    upload.single("headimg"),
    userController.headimg,
  )
  .delete("/", userController.delete);

module.exports = router;
