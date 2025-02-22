const {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} = require("../controllers/order.controller");
const {
  createOrderValidator,
  deleteOrderValidator,
  getOrderValidator,
  updateOrderValidator,
} = require("../shared/validation/order.validator");

const express = require("express");
const router = express.Router();

router.route("/").get(getOrders).post(createOrderValidator, createOrder);
router.route("/:id").get(getOrderValidator, getOrderById).put(updateOrderValidator, updateOrder).delete(deleteOrderValidator, deleteOrder);

module.exports = router;