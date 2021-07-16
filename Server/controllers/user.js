const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate use input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const encryptedPassword = await bcrypt.hash(password, 6);

    //  Create new user
    const newUser = new User({
      email,
      password: encryptedPassword,
    });

    await newUser.save();
    return res
      .status(200)
      .json({ message: "Successful", email: newUser.email });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res
      .status(200)
      .json({ message: "Sucessfully logged in", user: user });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.currentUser = (req, res) => {
  return res.json({ user: res.locals.user });
};

exports.logout = (req, res) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ message: "Sucessfully logged out" });
};
