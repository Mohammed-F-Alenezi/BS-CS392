const mongoose = require("mongoose");
const AccountModel = new mongoose.Schema({
  account_type: { type: String, required: true },
  balance: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Account", AccountModel);
