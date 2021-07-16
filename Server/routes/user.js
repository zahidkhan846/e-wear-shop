const express = require("express");
const {
  createUser,
  signinUser,
  currentUser,
  logout,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");
const { body } = require("express-validator");
const User = require("../model/user");

const bcrypt = require("bcrypt");

const router = express.Router();

router.post(
  "/create-user",
  body("email", "Email must be a valid email.")
    .isEmail()
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email already taken.");
        }
      });
    }),
  body("password", "Password mush be atleast 5 characters long.").isLength({
    min: 5,
  }),
  createUser
);

let userData;

router.post(
  "/signin-user",
  body("email", "Email must be a valid email.")
    .isEmail()
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (!user) {
          return Promise.reject("Email doesn't exist.");
        }
        userData = user;
      });
    }),
  body("password", "Password mush be atleast 5 characters long.")
    .isLength({
      min: 5,
    })
    .custom(async (password) => {
      if (!userData) {
        return Promise.reject("Email must be a valid email.");
      }
      const comparePasswords = await bcrypt.compare(
        password,
        userData.password
      );
      if (!comparePasswords) {
        return Promise.reject("Password doesn't match.");
      }
    }),
  signinUser
);
router.get("/current-user", auth, currentUser);
router.get("/logout-user", auth, logout);

module.exports = router;
