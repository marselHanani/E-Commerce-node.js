const express = require('express');
const router = express.Router();
const {isAdmin} = require('../auth/token/isAdmin');
const {verifyToken} = require('../auth/token/verify.token');

const {createCategory,
    deleteCategory,
    updateCategory,
    getCategories,
    getCategoryById,
    deleteMany
} = require('../controllers/category.controller');
const {createCategoryValidator
    ,deleteCategoryValidator,
    getCategoryValidator,
    updateCategoryValidator} = require('../shared/validation/category.validator');
const upload = require('../middlewares/upload');

const subCategoryRoute = require('./subCategory.route')

router.use("/:categoryId/subcategories", subCategoryRoute);

router.route('/').get(getCategories).post(verifyToken,isAdmin,upload.single('image'),createCategoryValidator,createCategory);
router.route('/:id')
.get(isAdmin,getCategoryValidator,getCategoryById)
.put(verifyToken,isAdmin,updateCategoryValidator,updateCategory)
.delete(verifyToken,isAdmin,deleteCategoryValidator,deleteCategory);

router.route('/delete-many/items').delete(verifyToken,deleteMany);


module.exports = router;