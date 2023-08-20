const Booking = require("../model/model.booking");

exports.book = async (req, res) => {
  try {
    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      user,
      name,
      phone,
      price,
    } = req.body;

    const booking = await Booking.create({
      place,
      user,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
    });
    await booking.save();
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      status: "success",
      data: bookings,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id }).populate(
      "place"
    );
    res.json({
      data: bookings,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.userData = (req, res) => {
  const { token } = req.cookies;
  console.log("user2" + token);
};
