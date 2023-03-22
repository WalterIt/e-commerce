const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_KEY);

const payment = async (req, res) => {
  // console.log(process.env.STRIPE_KEY);
  let status;
  const { token, amount } = req.body;
  //   console.log(token);
  try {
    const data = await stripe.charges.create({
      source: token,
      amount,
      currency: "usd",
    });
    status = "success";
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    status = "Failure";
    res.json({ error: error.message, status }); // Envie também o erro para o cliente
  }
};

module.exports = { payment };
