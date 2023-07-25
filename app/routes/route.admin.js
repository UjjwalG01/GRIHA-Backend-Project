const router = require("express").Router();

const adminController = require("../controller/controller.admin");

router.get("/", adminController.index);

router.post("/", adminController.store);

router.get("/get-admin", adminController.getAdmin);

router.get("/get-user", adminController.getUser);

module.exports = router;
