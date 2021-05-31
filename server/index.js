const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const createCheckoutSession = require("./api/checkout");
const webhook = require("./api/webhook");
const decodeJWT = require("./auth/decodeJWT");
const paymentIntent = require("./api/paymentIntent");
const setupIntent = require("./api/setupIntent");
const validateUser = require("./auth/validateUser");
const getCards = require("./api/getPaymentMethod");
const updatePaymentIntent = require("./api/updatePaymentIntent");
const app = express();
const port = 8080;

app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
app.use(cors({ origin: true }));

app.use(decodeJWT);

app.get("/", (req, res) => res.send("hello world"));

app.post("/create-checkout-session", createCheckoutSession);

app.post("create-payment-intent", paymentIntent);

app.post("save-payment-method", validateUser);

app.get("get-payment-method", validateUser, getCards);

app.put("update-payment-intent", validateUser, updatePaymentIntent);

app.post("/webhook", webhook);

app.listen(port, () => console.log("server is listening on port", port));
