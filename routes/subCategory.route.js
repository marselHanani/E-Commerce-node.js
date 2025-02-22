const express = require('express');
const router = express.Router({ mergeParams: true });// very important add mergeParams to access on other routes
const {isAdmin} = require('../auth/token/isAdmin');
const {verifyToken} = require('../auth/token/verify.token');

const {createSubCategory,
    deleteSubCategory,
    updateSubCategory,
    getSubCategories,
    getSubCategoryById,
    createFilterObj,
    setCategoryIdToBody
} = require('../controllers/subCategory.controller')
const {createSubCategoryValidator
    ,deleteSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
} = require('../shared/validation/subCategory.validator');
const ErrorHandler = require('../middlewares/ErrorHandler');
    
router.route('/').get(createFilterObj,getSubCategories).post(verifyToken,isAdmin,setCategoryIdToBody,createSubCategoryValidator,createSubCategory);
router.route('/:id')
.get(getSubCategoryValidator,getSubCategoryById)
.put(verifyToken,isAdmin,updateSubCategoryValidator,updateSubCategory)
.delete(verifyToken,isAdmin,deleteSubCategoryValidator,deleteSubCategory);

module.exports = router;