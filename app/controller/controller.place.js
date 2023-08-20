const uuid = require("uuid").v4;
const Place = require("../model/model.place");
const fileUploadHelper = require("../helper/helper.file");

exports.index = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.show = async (req, res) => {
  try {
    // must be authorized to see this page
    const places = await Place.find();
    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createPlace = async (req, res) => {
  try {
    const {
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      perks,
    } = req.body;
    const photos = req.files?.photo;
    // console.log(req.files);

    let images = [];
    if (photos.length > 0) {
      for (const photo of photos) {
        // const ext = await photo.name.split(".")[1];
        const path = `/uploads/img${uuid()}.jpg}`;
        images.push(path);
      }
      await Promise.all(
        photos.map(async (photo, index) => {
          photo.mv(`public${images[index]}`);
        })
      );
    } else {
      // const ext = await photos.name.split(".")[1];
      const path = `/uploads/img${uuid()}.jpg`;
      images.push(path);
      photos.mv(`public/${path}`);
    }

    const newPlace = await Place.create({
      title,
      address,
      description,
      price,
      extraInfo,
      checkIn,
      checkOut,
      photo: images,
      maxGuests,
      perks,
    });

    // console.log(newPlace);

    await newPlace.save();
    res.status(200).json({
      status: "success",
      data: newPlace,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const newData = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: newData,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const deletedItem = await Place.findByIdAndDelete(req.params.id);
    // console.log("Item deleted", deletedItem);
    res.status(200).json({
      status: "success",
      data: deletedItem,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getPlace = async (req, res) => {
  try {
    // if (!req.user) return res.status(400).json({ status: "error" });
    const place = await Place.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: place,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
