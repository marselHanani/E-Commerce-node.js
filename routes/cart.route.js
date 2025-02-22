const express = require('express');
const router = express.Router();
const {AddToCart,
    deleteCart,
    updateCart,
    getCarts,
    deleteMany
} = require('../controllers/cart.controller');
const {AddToCartValidator
    ,deleteCartValidator,
    updateCartValidator} = require('../shared/validation/cart.validator');

router.route('/').get(getCarts).post(AddToCartValidator,AddToCart);
router.route('/:id')
.put(updateCartValidator,updateCart)
.delete(deleteCartValidator,deleteCart);

router.route('/delete-many/items').delete(deleteMany);


module.exports = router;