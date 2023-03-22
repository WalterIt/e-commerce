const stripe = require("stripe")(process.env.STRIPE_KEY);


const payment = async (req, res) => {
  // console.log(process.env.STRIPE_KEY);
  let status;
  const { token, amount } = req.body;
  //   console.log(token);
  try {
    const data = await stripe.charges.create({
      source: token.id,
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
