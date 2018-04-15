const stripe = require("stripe")("sk_test_QfipXYlm6OOwX25oG37e2ahz");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits ",
      source: req.body.id
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
