const { check } = require("express-validator");
const mongoose = require("mongoose");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
exports.getRoleValidator = [
    check("id")
      .isMongoId()
      .withMessage("Invalid role ID format"),
    validatorMiddleware,
];

exports.createRoleValidator = [
  check("name")
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ min: 3 })
    .withMessage("Role name should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Role name should not be longer than 20 characters"),

  check("permissions")
    .isArray()
    .withMessage("Permissions should be an array of permission IDs")
    .notEmpty()
    .withMessage("Permissions are required")
    .custom((permissions) => {
      permissions.forEach((permission) => {
        if (!mongoose.Types.ObjectId.isValid(permission)) {
          throw new Error(`Invalid permission ID: ${permission}`);
        }
      });
      return true;
    }),

  validatorMiddleware,
];

exports.updateRoleValidator = [
  check("id").isMongoId().withMessage("Invalid role ID format"),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Role name should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Role name should not be longer than 20 characters"),

  check("permissions")
    .optional()
    .isArray()
    .withMessage("Permissions should be an array of permission IDs")
    .custom((permissions) => {
      permissions.forEach((permission) => {
        if (!mongoose.Types.ObjectId.isValid(permission)) {
          throw new Error(`Invalid permission ID: ${permission}`);
        }
      });
      return true;
    }),

  validatorMiddleware,
];

exports.deleteRoleValidator = [
  check("id").isMongoId().withMessage("Invalid role ID format"),
  validatorMiddleware,
];

