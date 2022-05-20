const express = require("express");
const router = express.Router();
const CategoryproductsController = require("../controllers/CategoryproductsController.js");

router.get("/showall/", CategoryproductsController.showCategoryProducts);

module.exports = router;