const { check } = require('express-validator');
const Product = require('../../models/Product.model');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.AddToCartValidator = [
    check('user')
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid user ID format"),
    check('items')
        .isArray({ min: 1 }).withMessage("Cart must contain at least one item"),
    check('items.*.product')
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Invalid product ID format")
        .custom(async (productId) => {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} does not exist`);
            }
        }),
    check('items.*.quantity')
        .isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"),
    check('totalPrice')
        .optional()
        .isFloat({ min: 0 }).withMessage("Total price must be 0 or greater"),
    check('status')
        .optional()
        .isIn(['active', 'checked_out']).withMessage("Invalid status value"),
    validatorMiddleware,
];
exports.updateCartValidator = [
    check("id")
        .isMongoId().withMessage("Invalid cart ID format"),
    ...exports.AddToCartValidator,
    validatorMiddleware,
];
exports.deleteCartValidator = [
    check("id")
        .isMongoId().withMessage("Invalid cart ID format"),
    validatorMiddleware,
];
