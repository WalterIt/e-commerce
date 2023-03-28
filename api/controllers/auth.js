import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const { username, email, firstName, lastName } = req.body;

  const newUser = new User({
    username,
    email,
    firstName,
    lastName,
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

export const login = async (req, res) => {
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
      { expiresIn: "3d" }
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
