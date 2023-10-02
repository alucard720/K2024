const jwt = require("jsonwebtoken");
require("dotenv").config();
// Import your secret key

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;
