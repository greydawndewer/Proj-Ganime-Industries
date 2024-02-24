const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const verifyToken = require("./middleware/verifyToken");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.status(200).json("pong");
});

app.get("/protected", verifyToken, (req, res) => {
  return res.json(req.user);
});

app.use("/auth", userRoutes);

app.listen(9000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
