const {
  create,
  deleteCart,
  getUserCart,
  getUserCarts,
  update,
} = require("../controllers/cart.js");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, create);
router.put("/:id", verifyTokenAndAuthorization, update);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/", verifyTokenAndAdmin, getUserCarts);

module.exports = router;
