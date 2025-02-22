const SubCategory = require('../models/SubCategory.model');
const factory = require('./handlers');

// @desc get all subcategories
// @Route GET /api/v1/subcategories
// @access public
exports.getSubCategories = factory.apiGetAll(SubCategory,"SubCategories");

// @desc get single SubCategory
// @Route GET /api/v1/subcategories/:id
// @access public
exports.getSubCategoryById = factory.apiGetOne(SubCategory);

// @desc create a SubCategory
// @Route POST /api/v1/subcategories
// @access private
exports.createSubCategory = factory.apiCreateOne(SubCategory);

// @desc update a SubCategory
// @Route PUT /api/v1/subcategories/:id
// @access private
exports.updateSubCategory = factory.apiUpdateOne(SubCategory);

// @desc delete a SubCategory
// @Route DELETE /api/v1/subcategories/:id
// @access private
exports.deleteSubCategory = factory.apiDeleteOne(SubCategory); 

// @desc get single SubCategory for a specific category
// @Route GET /api/v1/category/:categoryId/subcategories
// @access public
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObj = filterObject; 
    next();
};

// @desc create a SubCategory for specific category
// @Route POST /api/v1/category/:categoryId/subcategories
// @access private
exports.setCategoryIdToBody = (req, res, next) => {
    if(!req.body.category) req.body.category = req.params.categoryId;
    next();
  }