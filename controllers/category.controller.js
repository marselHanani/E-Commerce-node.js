const Category = require('../models/Category.model');
const factory = require('./handlers');

// @desc get all Categories
// @Route GET /api/v1/categories
// @access public
exports.getCategories = factory.apiGetAll(Category,"Categories");

// @desc get single Category
// @Route GET /api/v1/categories/:id
// @access public
exports.getCategoryById = factory.apiGetOne(Category);

// @desc create a Category
// @Route POST /api/v1/categories
// @access private
exports.createCategory = factory.apiCreateOne(Category);

// @desc update a Category
// @Route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = factory.apiUpdateOne(Category);
// @desc delete a Category
// @Route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = factory.apiDeleteOne(Category);
// @desc delete All Categories
// @Route DELETE /api/v1/delete-many/categories
// @access private
exports.deleteMany = factory.apiDeleteAll(Category);