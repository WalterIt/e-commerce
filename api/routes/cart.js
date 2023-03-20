import express from "express";
import {
  create,
  deleteCart,
  getUserCart,
  getUserCarts,
  update,
} from "../controllers/cart.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, create);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getUserCarts);

export default router;
