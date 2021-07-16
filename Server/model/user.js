const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    required: false,
    default: false,
  },
  cart: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  products: {
    type: Array,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
