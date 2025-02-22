const { check } = require('express-validator');
const Product = require('../../models/Product.model');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createReviewValidator = [
    check('user')
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid user ID format"),
    check('product')
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
    check('rating')
        .optional()
        .isFloat({ min: 0 , max:5 }).withMessage("Rating product must be between 0 and 5"),
        check("comment")
        .notEmpty()
        .withMessage("Product comment is required")
        .isLength({ min: 10 })
        .withMessage("Product comment must be at least 10 characters long"),
    validatorMiddleware,
];

exports.getReviewValidator = [
    check("id")
        .isMongoId().withMessage("Invalid Review ID format"),
    validatorMiddleware,
];
exports.updateReviewValidator = [
    check("id")
        .isMongoId().withMessage("Invalid Review ID format"),
    ...exports.createReviewValidator,
    validatorMiddleware,
];
exports.deleteReviewValidator = [
    check("id")
        .isMongoId().withMessage("Invalid Review ID format"),
    validatorMiddleware,
];
