const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });

  try {
    const savedUser = await newUser.save();

    const { password, ...other } = savedUser._doc;

    res.status(201).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400);
      throw new Error("User not Found. Please, sign up!");
    }

    // Check if Password is correct
    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect) {
      res.status(400);
      throw new Error("Bad Credentials!");
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...other } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .json({ other, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { login, register };
