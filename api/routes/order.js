import express from "express";
import {
  create,
  deleteOrder,
  getUserOrder,
  getUserOrders,
  update,
  income,
} from "../controllers/order.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, create);
router.get("/income", verifyTokenAndAdmin, income);
router.put("/:id", verifyTokenAndAdmin, update);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/:userId", verifyTokenAndAuthorization, getUserOrder);
router.get("/", verifyTokenAndAdmin, getUserOrders);

export default router;
