const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/model.user");

exports.index = async (req, res) => {
  res.json("Hello, world!");
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      status: "error",
      data: "Email or Password are required",
    });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "error",
        data: "User does not exist",
      });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      res.status(400).json({
        status: "error",
        data: "Invalid Password",
      });

    const payload = {
      sub: user._id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    };

    const access_token = await generateAccessToken(payload);
    const refresh_token = await generateRefreshToken(payload);
    user.password = undefined;

    req.session.user = user;

    res.status(200).json({
      status: "success",
      data: {
        user,
        access_token,
        refresh_token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.stack,
    });
  }
};

// Backup Login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const match = await bcrypt.compare(password, user.password);
//       if (match) {
//         req.session.user = user;
//         res.status(200).redirect("/");
//       } else {
//         res.status(400).json({
//           status: "error",
//           data: err.message,
//         });
//       }
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: "error",
//       data: err.message,
//     });
//   }
// };

exports.logout = async (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }
  res.redirect("/login");
};

exports.profile = async (req, res) => {
  try {
    if (req.session?.user) {
      const { email } = await req.session.user;
      const loggedInUser = await User.find({ email });
      if (loggedInUser) {
        res.json({
          status: "success",
          data: loggedInUser,
        });
      } else {
        res.status(404).json({
          status: "error",
          data: "User not logged in",
        });
      }
    } else {
      res.status(400).json(null);
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      data: err.message,
    });
  }
};

function generateAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}

// To generate tokens secret
// require("crypto").randomBytes(64).toString("hex")

function generateRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "20d" },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}
