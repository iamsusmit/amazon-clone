const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
//From Stripe
const stripe = require("stripe")(
  "sk_test_51IOg1FKRA3NI3j1yAiruXq0i85FyJ5Ay6907EE9y8Vm5lSDxZVnhFTVowzRFSTb3H9U5Nwkrl7IpVsJEyyJjTcKB00FlKKVBue"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  console.log(paymentIntent);

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-69cd8/us-central1/api

//to start the backend--> cd functions--->firebase emulators:start