const router = require("express").Router();

const allPlaces = require("../controller/controller.place");

router.get("/", allPlaces.show);

router.post("/upload", allPlaces.upload);
router.post("/create", allPlaces.createPlace);

router.put("/:id", allPlaces.updatePlace);

router.delete("/:id", allPlaces.deletePlace);

router.get("/:id", allPlaces.getPlace);

module.exports = router;
