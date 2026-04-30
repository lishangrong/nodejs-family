const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");

router
  .post("/register", userValidator.register, userController.register)
  .post("/login", userValidator.login, userController.login)
  .get("/list", verifyToken, userController.list)
  .put("/", verifyToken, userValidator.update, userController.update)
  .delete("/", userController.delete);

module.exports = router;
