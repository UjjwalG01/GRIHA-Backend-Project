const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res.status(401).json({
        status: "error",
        message: "Access denied",
      });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(400).json({
          status: "failed",
          message: "Invalid Token",
        });

      req.token = token;
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = auth;
