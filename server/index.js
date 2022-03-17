require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRoute = require("./Routes/user");
const productsRoute = require("./Routes/products");
const orderRoute = require("./Routes/order");
const cartRoute = require("./Routes/cart");
const stripeRoute = require("./Routes/stripe");
const cors=require("cors");

app.use(cors())
//body Parser
app.use(express.json());

//!reasigning the value of our mongodb string conncetion into another variable as follows
const uri = process.env.MONGO_URL;

//!creating a new connection using Mongoose.connect methode
mongoose.connect(
  uri,
  () => {
    console.log("connected to mongodb");
  },
  (err) => {
    console.log(err);
  }
);

//! Routes
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", orderRoute);
app.use("/carts", cartRoute);
app.use("/checkout", stripeRoute);

//Port listening
const Port = process.env.PORT || 3000;
app.listen(Port, (req, res) => {
  console.log(`Server started listening on port:http://localhost:${Port}`);
});
