const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(402).json("Please provide all fields.");
    }

    const checkIfUserExists = await User.findOne({ where: {username} });
    if (checkIfUserExists) {
      return res.status(401).json("User already exists.");
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPW,
    });

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json("Please provide all fields.");
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(402).json("Wrong credentials..");
  }

  // compare password
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) return res.status(403).json("Wrong credentials..");

  const token = generateToken(user._id);

  res.status(200).json({ user, token });
};

const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, "0434098329", {
      expiresIn: "3d",
    });

    return token;
  } catch (error) {
    console.log(error + "YOO");
  }
};
//doubt ends

module.exports = {
  register,
  login,
};
