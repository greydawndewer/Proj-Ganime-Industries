const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).json("Not Authenticated.");
      req.user = await User.findById(decoded.id);

      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
