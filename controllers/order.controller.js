const factory = require('./handlers');
const Order = require('../models/Order.model');

// @desc get all Orders
// @Route GET /api/v1/orders
// @access public
exports.getOrders = factory.apiGetAll(Order,"Orders",["products","user"]);

// @desc get single Order
// @Route GET /api/v1/orders/:id
// @access public
exports.getOrderById = factory.apiGetOne(Order);

// @desc create a Order
// @Route POST /api/v1/orders
// @access public
exports.createOrder = factory.apiCreateOne(Order);
// @desc update a Order
// @Route PUT /api/v1/orders/:id
// @access public
exports.updateOrder = factory.apiUpdateOne(Order);

// @desc delete a Order
// @Route DELETE /api/v1/orders/:id
// @access public
exports.deleteOrder = factory.apiDeleteOne(Order);
