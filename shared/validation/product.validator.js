const {check} = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const {default:slugify} = require("slugify");
const Category = require("../../models/Category.model");
const SubCategory = require("../../models/SubCategory.model");

exports.createProductValidator = [
    check("title")
      .notEmpty()
      .withMessage("Product title is required")
      .isLength({ min: 3 })
      .withMessage("Too short Product name")
      .isLength({ max: 100 })
      .withMessage("Too long Product name")
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    check("description")
      .notEmpty()
      .withMessage("Product description is required")
      .isLength({ min: 10 })
      .withMessage("Product description must be at least 10 characters long"),
      check("quantity")
      .notEmpty()
      .withMessage("the products quantity is required")
      .isNumeric()
      .withMessage("Product quantity must be a number"),
    check("sold")
      .optional()
      .isNumeric()
      .withMessage("the products sold must be a number"),
    check("price")
      .notEmpty()
      .withMessage("the products price is required")
      .isNumeric()
      .withMessage("Product price must be a number")
      .isLength({ max: 20000 })
      .withMessage("Too long price "),
      check("discount")
      .optional()
      .toFloat()
      .isNumeric()
      .withMessage("product price must be a number")
      .custom((value, { req }) => {
        // i use it to check some conditions
        if (req.body.price <= value) {
          // here check if the price after discount is correct value or not
          throw new Error("price after discount must be lower than normal price");
        }
        return true;
      }),
    check("images")
      .optional()
      .isArray()
      .withMessage("the product images must be an array of strings"),
    check("category")
      .notEmpty()
      .withMessage("the products category is required")
      .isMongoId()
      .withMessage("invalid id formate")
      .custom(
      (value) =>
        Category.findById(value).then((Category) => {
          if (!Category) {
            return Promise.reject(new Error(`Invalid category id`));
          }
        })
    ),
  check("subCategory")
    .optional()
    .custom((value) => {
      if (!value) return true;
      const subcategoriesId = Array.isArray(value) ? value : [value];
      return SubCategory.find({ _id: { $in: subcategoriesId } }).then(
        (result) => {
          if (result.length !== subcategoriesId.length || result.length < 1) {
            return Promise.reject(new Error("Invalid subCategory IDs"));
          }
        }
      );
    })
    .custom((val, { req }) =>
        SubCategory.find({ category: req.body.category }).then(
          (subCategories) => {
            const subCategoriesIdInDB = subCategories.map((subCat) =>
              subCat._id.toString()
            );
            const unique = new Set(val); 
            if (!val.every((v) => subCategoriesIdInDB.includes(v))) {
              return Promise.reject(
                new Error("subCategories do not belong to Category")
              );
            }
            if (unique.size !== subCategoriesIdInDB.length) {
              return Promise.reject(new Error("The data contains duplicates"));
            }
          }
        )
      ),
    check("brand")
      .optional()
      .isMongoId()
      .withMessage("invalid id formate"),
      validatorMiddleware
];

exports.getProductValidator = [
    check("id").isMongoId().withMessage("invalid Product id format"),
    validatorMiddleware,
  ];

  exports.updateProductValidator = [
    check("id").isMongoId().withMessage("invalid Product id format"),
    validatorMiddleware,
  ];
  
  exports.deleteProductValidator = [
    check("id").isMongoId().withMessage("invalid Product id format"),
    validatorMiddleware,
  ];
  
