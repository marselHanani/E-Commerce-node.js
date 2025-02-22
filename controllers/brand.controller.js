const Brand = require('../models/Brand.model');
const factory = require('./handlers');

// @desc get all Brands
// @Route GET /api/v1/brands
// @access public
exports.getBrands = factory.apiGetAll(Brand,"Brands");

// @desc get single brand
// @Route GET /api/v1/brands/:id
// @access public
exports.getBrandById = factory.apiGetOne(Brand);

// @desc create a brand
// @Route POST /api/v1/brands
// @access private
exports.createBrand = factory.apiCreateOne(Brand);

// @desc update a brand
// @Route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = factory.apiUpdateOne(Brand);

// @desc delete a brand
// @Route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = factory.apiDeleteOne(Brand);