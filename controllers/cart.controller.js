const factory = require('./handlers');
const Cart = require('../models/Cart.model');

// @desc get all Cart
// @Route GET /api/v1/cart
// @access public
exports.getCarts = factory.apiGetAll(Cart,"Cart",["products","user"]);

// @desc create a Cart
// @Route POST /api/v1/cart
// @access public
exports.AddToCart = factory.apiCreateOne(Cart);
// @desc update a Cart
// @Route PUT /api/v1/cart/:id
// @access public
exports.updateCart = factory.apiUpdateOne(Cart);

// @desc delete a Cart
// @Route DELETE /api/v1/cart/:id
// @access public
exports.deleteCart = factory.apiDeleteOne(Cart);
// @desc delete All Cart
// @Route DELETE /api/v1/delete-many/cart
// @access public
exports.deleteMany = factory.apiDeleteAll(Cart);