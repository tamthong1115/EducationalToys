const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51QIuZsCY44542ryJosOG0UjumsrPirDsbjOsVCoFfbibbSFqCytnClbhaRyR5DPlU9rm0ZQB8pIXm3z0gMJfvYEh00nNxH7r71"
);
const app = express();
app.use(express.json());
app.use(cors());
app.post("/create-checkout-session", async (req, res) => {
  try {
    // test 4242 4242 4242 4242
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "product",
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success", // URL khi thanh toán thành công
      cancel_url: "http://localhost:5173/cancel-payment", // URL khi hủy thanh toán
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => console.log("Server running on port 3000"));
