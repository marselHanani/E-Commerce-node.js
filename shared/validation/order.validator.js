const { check } = require('express-validator');
const Product = require('../../models/Product.model');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createOrderValidator = [
    check('user').notEmpty()
        .withMessage("The user ID is required")
        .isMongoId()
        .withMessage("Invalid ID format"),
        check('items').isArray({ min: 1 }).withMessage('Products array required')
        .custom(async (products) => {
            for (let item of products) {
                if (!item.product || !item.quantity) {
                    throw new Error("Each item must have a product and quantity");
                }
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error(`Invalid product ID: ${item.product}`);
                }
                if (item.quantity <= 0) {
                    throw new Error("Quantity must be a positive number");
                }
            }
        }),
    check('totalPrice').isFloat({ gt: 0 }).withMessage('Total must be a positive float'),
    check('status').optional().isIn(['pending', 'processing', 'shipped', 'delivered', 'canceled'])
    .withMessage('Invalid status'),
    check('paymentMethod').notEmpty()
        .withMessage("Payment method is required")
        .isIn(['credit_card', 'paypal', 'cash_on_delivery'])
        .withMessage('Invalid payment method'),
    check('paymentStatus').optional().isIn(['pending', 'paid', 'failed'])
    .withMessage('Invalid payment status'),
    check('shippingAddress').isLength({ min: 5 }).withMessage('Shipping address required'),
    validatorMiddleware,
];

exports.getOrderValidator = [
    check("id").isMongoId().withMessage("Invalid order ID format"),
    validatorMiddleware,
];

exports.updateOrderValidator = [
    check("id").isMongoId().withMessage("Invalid order ID format"),
    ...exports.createOrderValidator,
    validatorMiddleware,
];

exports.deleteOrderValidator = [
    check("id").isMongoId().withMessage("Invalid order ID format"),
    validatorMiddleware,
];