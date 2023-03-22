const User = require("../models/User");
const {
  deleteUser,
  getStats,
  getUser,
  getUsers,
  update,
} = require("../controllers/user.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.get("/stats", verifyTokenAndAdmin, getStats);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);

module.exports = router;
