const express = require('express');
const router = express.Router();
const {isAdmin} = require('../auth/token/isAdmin');
const {verifyToken} = require('../auth/token/verify.token');

const {createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductById,
    getProductsByCategorySlug
} = require('../controllers/product.controller');
const upload = require('../middlewares/upload');
const {createProductValidator
    ,deleteProductValidator,
    getProductValidator,
    updateProductValidator} = require('../shared/validation/product.validator');
router.route('/').get(getProducts).post(verifyToken,isAdmin,upload.array('images', 5),createProductValidator,createProduct);
router.route('/:id').get(getProductValidator,getProductById)
.put(verifyToken,isAdmin,updateProductValidator,updateProduct).delete(verifyToken,isAdmin,deleteProductValidator,deleteProduct);
router.route('/category/:slug').get(getProductsByCategorySlug);

module.exports = router;