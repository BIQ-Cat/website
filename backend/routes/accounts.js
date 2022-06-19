const express = require("express");
const validator = require("validator").default;
const jwt = require("jsonwebtoken");
const async = require("async");

const User = require("../models/user");
const config = require("../../config");

const router = express.Router();

router.post("/reg", (req, res) => {
  if (!req.body.email || !req.body.login || !req.body.password)
    return res.json({
      success: false,
      msg: "Not all requied data statified",
    });
  if (!validator.isEmail(req.body.email))
    return res.json({
      success: false,
      msg: "Invalid email",
    });
  async.waterfall(
    [
      function (callback) {
        User.getUserByLogin(req.body.login, (err, user) =>
          checkUnique(err, user, (result) => {
            console.log(result);
            callback(null, result);
          })
        );
      },
      function (exists, callback) {
        console.log(exists);
        User.getUserByEmail(req.body.email, (err, user) =>
          checkUnique(err, user, (result) => {
            console.log(result);
            callback(null, exists || result);
          })
        );
      },
    ],
    function (error, exists) {
      if (error) console.error(err);
      if (exists)
        res.json({
          success: false,
          msg: "User exists",
        });
      else {
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username: req.body.login,
          password: req.body.password,
        });
        newUser.save((err, user) => {
          if (err) return console.error(err);
          res.json({
            success: true,
            data: {},
          });
        });
      }
    }
  );
});
router.post("/auth", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  async.waterfall(
    [
      function (callback) {
        User.getUserByLogin(login, (err, user) =>
          checkUnique(err, user, (result) => callback(null, result, user))
        );
      },
      function (result, user, callback) {
        if (result) {
          authUser(password, user, res);
          callback(null, null, null);
        } else {
          User.getUserByEmail(login, (err, user) =>
            checkUnique(err, user, (result) => callback(null, result, user))
          );
        }
      },
    ],
    function (err, result, user) {
      if (result == null) return;
      console.log(result);
      if (result) return authUser(password, user, res);
      res.json({
        success: false,
        msg: "User not found",
      });
    }
  );
});
router.post("/dashboard", (req, res) => {
  if (!req.body.token)
    return res.json({
      success: false,
      msg: "No token sent",
    });
  jwt.verify(req.body.token, config.SECRET, (err, user) => {
    if (err)
      res.send({
        success: false,
        msg: "Failed to decrypt JWT",
      });
    res.send({
      success: true,
      data: user,
    });
  });
});

function checkUnique(err, user, callback) {
  if (err) return console.error(err);
  if (user) callback(true);
  else callback(false);
}
function authUser(password, user, response) {
  if (user.is_banned)
    return response.json({
      success: false,
      msg: "User was banned",
    });
  User.comparePass(password, user.password, (err, isMatch) => {
    if (err) console.error(err);
    if (isMatch) {
      const userToSave = {
        name: user.name,
        login: user.username,
        email: user.email,
      };
      const token = jwt.sign(userToSave, config.SECRET, {
        expiresIn: 3600 * 24,
      });
      response.json({
        success: true,
        data: {
          token: token,
          user: userToSave,
        },
      });
    } else
      response.json({
        success: false,
        msg: "Wrong password",
      });
  });
}

module.exports = router;
