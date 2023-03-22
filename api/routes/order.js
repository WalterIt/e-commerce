const {
  create,
  deleteOrder,
  getUserOrder,
  getUserOrders,
  update,
  income,
} = require("../controllers/order.js");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, create);
router.get("/income", verifyTokenAndAdmin, income);
router.put("/:id", verifyTokenAndAdmin, update);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/:userId", verifyTokenAndAuthorization, getUserOrder);
router.get("/", verifyTokenAndAdmin, getUserOrders);

module.exports = router;
