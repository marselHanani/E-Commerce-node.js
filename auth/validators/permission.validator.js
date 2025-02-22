const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getPermissionValidator = [
    check("id")
      .isMongoId()
      .withMessage("Invalid permission ID format"),
    validatorMiddleware,
];

exports.createPermissionValidator = [
  check("name")
    .notEmpty()
    .withMessage("Permission name is required")
    .isLength({ min: 3 })
    .withMessage("Permission name should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Permission name should not be longer than 20 characters"),

  validatorMiddleware,
];

exports.updatePermissionValidator = [
  check("id").isMongoId().withMessage("Invalid permission ID format"),
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Permission name is required")
    .isLength({ min: 3 })
    .withMessage("Permission name should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Permission name should not be longer than 20 characters"),

  validatorMiddleware,
];

exports.deletePermissionValidator = [
  check("id").isMongoId().withMessage("Invalid permission ID format"),
  validatorMiddleware,
];


