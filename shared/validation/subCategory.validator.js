const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subCategory id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required")
    .isLength({ min: 2 })
    .withMessage("Too short subCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("category id is required")
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subCategory id format"),
  check("name")
    .notEmpty()
    .withMessage("you can not leave empty subCategory name")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subCategory id format"),
  validatorMiddleware,
];
