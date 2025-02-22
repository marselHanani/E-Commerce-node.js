const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getUserValidator = [
    check("id")
      .isMongoId()
      .withMessage("Invalid user ID format"), 
    validatorMiddleware,
  ];

exports.createUserValidator = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Username should not be longer than 20 characters"),
  
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),

  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isMongoId()
    .withMessage("Invalid role ID format"),

  check("status")
    .optional()
    .isIn(["active", "inactive", "banned"])
    .withMessage("Status must be one of 'active', 'inactive', or 'banned'"),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  check("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long")
    .isLength({ max: 20 })
    .withMessage("Username should not be longer than 20 characters"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number format"),

  check("role")
    .optional()
    .isMongoId()
    .withMessage("Invalid role ID format"),

  check("status")
    .optional()
    .isIn(["active", "inactive", "banned"])
    .withMessage("Status must be one of 'active', 'inactive', or 'banned'"),

  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user ID format"),
  validatorMiddleware,
];


