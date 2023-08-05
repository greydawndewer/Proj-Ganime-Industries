const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Please provide all fields.");
    }

    const checkIfUserExists = await User.findOne({ username });
    if (checkIfUserExists) {
      return res.status(400).json("User already exists.");
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPW,
    });

    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json("Please provide all fields.");
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json("Wrong credentials..");
  }

  // compare password
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) return res.status(401).json("Wrong credentials..");

  const token = generateToken(user._id);

  res.status(200).json({ user, token });
};

const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
//doubt ends

module.exports = {
  register,
  login,
};
