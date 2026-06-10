const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1" });
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");
const { auth } = require("../middleware/auth");

router.get("/user/:userId", userController.index);
router.post("/user/register", userValidator.register, userController.register);
router.post("/user/login", userValidator.login, userController.login);
router.put("/user/:userId", auth, userValidator.update, userController.update);

module.exports = router;
