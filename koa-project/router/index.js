const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1" });
const userController = require("../controller/userController");
const { validateRegister } = require("../middleware/validator");

router.get("/user/:userId", userController.index);
router.post("/user/register", validateRegister, userController.register);

module.exports = router;
