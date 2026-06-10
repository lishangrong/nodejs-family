const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1" });
const userController = require("../controller/userController");
const { validateRegister, validateLogin, validateUpdate } = require("../middleware/validator");
const { auth } = require("../middleware/auth");

router.get("/user/:userId", userController.index);
router.post("/user/register", validateRegister, userController.register);
router.post("/user/login", validateLogin, userController.login);
router.patch("/user/:userId", auth, validateUpdate, userController.update);

module.exports = router;
