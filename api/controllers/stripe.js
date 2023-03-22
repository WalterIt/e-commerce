import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import stripe from "stripe";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const stripe = require("stripe")(process.env.STRIPE_KEY);  how to use import in this line

const { STRIPE_KEY } = process.env;
const stripeInstance = stripe(STRIPE_KEY);

export const payment = async (req, res) => {
  stripeInstance.charges.create(
    {
      source: req.body.token,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};
