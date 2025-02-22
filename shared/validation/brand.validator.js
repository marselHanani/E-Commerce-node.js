const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 20 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  check("name")
    .notEmpty()
    .withMessage("you can not leave empty Brand name")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 20 })
    .withMessage("Too long Brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid Brand id format"),
  validatorMiddleware,
];
