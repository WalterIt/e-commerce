const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const {
  create,
  deleteProduct,
  getProduct,
  getProducts,
  update,
} = require("../controllers/product.js");

router.post("/", verifyTokenAndAdmin, create);
router.put("/:id", verifyTokenAndAdmin, update);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
