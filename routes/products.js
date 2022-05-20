const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");

// Crea un endpoint para actualizar un producto. 
router.put("/updateproducts/:id", ProductController.update);
router.get("/showall/byid/:id", ProductController.getAll);
router.get("/showall/des", ProductController.desc);
router.get("/searchproduct/:name", ProductController.showName);
router.get("/showproducts/", ProductController.showAll);
router.delete("/delete/:id", ProductController.delete);
module.exports = router;
