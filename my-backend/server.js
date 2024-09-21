const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("./UserModel");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const JWT_SERCRET = process.env.JWT_SERCRET;

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
const User = mongoose.model("User");
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.post("/sign-up", async (req, res) => {
  const { username, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User already exists" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
    });
    res.send({ status: "ok ", data: "User created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (!oldUser) {
    return res.send({ data: "User doesn't exists" });
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SERCRET);
    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
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
