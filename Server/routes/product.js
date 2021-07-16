const express = require("express");
const { createProduct } = require("../controllers/product");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/create-product", auth, createProduct);

module.exports = router;
