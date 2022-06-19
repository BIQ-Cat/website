const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const config = require("../../config");

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    set: (v) => validator.default.normalizeEmail(v),
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_banned: {
    type: Boolean,
    default: false,
  },
});
schema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
const User = (module.exports = mongoose.model("User", schema));
module.exports.getUserByLogin = function (login, callback) {
  const query = { username: login };
  User.findOne(query, callback);
};
module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.comparePass = (pass, dbPass, callback) =>
  bcrypt.compare(pass, dbPass, callback);
