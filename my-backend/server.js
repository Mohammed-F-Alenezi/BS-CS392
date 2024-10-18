const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
require("./UserModel");
dotenv.config();

const PORT = 8082;

const JWT_SERCRET = process.env.JWT_SERCRET;

// MongoDB Connection
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

const User = mongoose.model("User");

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/sign-up", async (req, res) => {
  const { username, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.json({ status: "error", message: "User already exists" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
      accounts: [],
    });
    res.json({ status: "ok", message: "User created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    return res.send({ data: "User doesn't exist" });
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SERCRET);
    if (res.status(200)) {
      return res.send({ status: 200, data: token });
    } else {
      res.send({ error: "error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SERCRET);
    const useremail = user.email;
    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.send({ error: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
