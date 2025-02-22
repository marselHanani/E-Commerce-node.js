const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 20 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  check("name")
    .notEmpty()
    .withMessage("you can not leave empty category name")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 20 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
