const router = require("express").Router();
const myBookings = require("../controller/controller.booking");

router.get("/", myBookings.allBookings);

router.get("/:id", myBookings.getBookings);

router.post("/", myBookings.book);

router.get("/user", myBookings.userData);

module.exports = router;
