const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController.js");


router.get("/showcategory/:id", CategoryController.selectCategory);
router.get("/showcategory/", CategoryController.SelectAllCategories);
router.put("/updatecategory/:id", CategoryController.updateCategory);
router.post("/createcategory", CategoryController.createCategory);

module.exports = router;
