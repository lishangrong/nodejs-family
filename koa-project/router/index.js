const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1" });
const userController = require("../controller/userController");
const userValidator = require("../middleware/validator/userValidator");

router.get("/user/:userId", userController.index);
router.post("/user/register", userValidator.register, userController.register);

module.exports = router;
