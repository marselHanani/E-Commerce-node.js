const factory = require('./handlers');
const Product = require('../models/Product.model');
const Category = require('../models/Category.model');
const upload = require('../middlewares/upload')
const ApiError = require('../shared/apiError');
const statuscode = require('../shared/statusCode');

// @desc get all products
// @Route GET /api/v1/products
// @access public
exports.getProducts = factory.apiGetAll(Product,"Products",["category","subCategory"]);

// @desc get single product
// @Route GET /api/v1/products/:id
// @access public
exports.getProductById = factory.apiGetOne(Product);

// @desc create a product
// @Route POST /api/v1/products
// @access private
exports.createProduct = factory.apiCreateOne(Product);
// @desc update a product
// @Route PUT /api/v1/products/:id
// @access private
exports.updateProduct = factory.apiUpdateOne(Product);

// @desc delete a product
// @Route DELETE /api/v1/products/:id
// @access private
exports.deleteProduct = factory.apiDeleteOne(Product);

// @desc get all products for specific category
// @Route GET /api/v1/products/category/:slug
// @access public
exports.getProductsByCategorySlug = async (req, res, next) => {
    try {
        const categorySlug = req.params.slug;
        console.log("Requested Category Slug:", categorySlug);
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) {
            return next(new ApiError("Category not found", statuscode.notFound));
        }
        const products = await Product.find({ category: category._id})
            .populate('category','name-_id') 
            .populate('subCategory','name-_id')
            .exec();
        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (e) {
        next(new ApiError("Error while fetching products", statuscode.serverError));
    }
};
