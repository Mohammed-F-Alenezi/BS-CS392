const mongoose = require("mongoose");


const AccountModel = new mongoose.Schema({
  account_type: { type: String, required: true },
  balance: { type: Number, required: true, min: 0 },
});
const UserModel = new mongoose.Schema({
  email: { type: String, required: true, uniqe: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  accounts: [AccountModel],
});
module.exports = mongoose.model("User", UserModel);
