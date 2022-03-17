const mongoose = require("mongoose");

// const addressSchema = new mongoose.Schema({
//   city: {
//     type: String,
//     required: true,
//   },
//   street: {type: String, required: true},
//   country: {type: String, required: true},
//   postalCode: {type: Number, required: true},
// });

const userSchema = new mongoose.Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number},
    // address: addressSchema,
    gender: {type: String, unique: false},
    dateOfBirth: {type: Date, unique: false},
    image: {type: String},
    company: {type: String},
    city: {type: String},
    postalService: {type: String},
    street: {type: String},
    country: {type: String},
    postalCode: {type: Number},
    isAdmin: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
