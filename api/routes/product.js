import express from "express";
import {
  create,
  deleteProduct,
  getProduct,
  getProducts,
  update,
} from "../controllers/product.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, create);
router.put("/:id", verifyTokenAndAdmin, update);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

export default router;
