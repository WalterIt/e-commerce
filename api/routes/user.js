import express from "express";
import {
  deleteUser,
  getStats,
  getUser,
  getUsers,
  update,
} from "../controllers/user.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";

const router = express.Router();

router.get("/stats", verifyTokenAndAdmin, getStats);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);

export default router;
