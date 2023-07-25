const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

module.exports = connect;
