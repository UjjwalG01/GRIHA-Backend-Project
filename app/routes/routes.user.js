const router = require("express").Router();

const userRoutes = require("../controller/controller.user");

router.get("/", userRoutes.index);

router.post("/register", userRoutes.register);

router.post("/login", userRoutes.login);

router.delete("/:id", userRoutes.logout);

router.get("/profile", userRoutes.profile);

module.exports = router;
