const express = require('express');
const router = express.Router();
const {isAdmin} = require('../auth/token/isAdmin');
const {verifyToken} = require('../auth/token/verify.token');

const {createBrand,
    deleteBrand,
    updateBrand,
    getBrands,
    getBrandById
} = require('../controllers/brand.controller');
const upload = require('../middlewares/upload');
const {createBrandValidator
    ,deleteBrandValidator,
    getBrandValidator,
    updateBrandValidator} = require('../shared/validation/brand.validator');
router.route('/').get(getBrands).post(verifyToken,isAdmin,upload.single('image'),createBrandValidator,createBrand);
router.route('/:id')
.get(getBrandValidator,getBrandById)
.put(verifyToken,isAdmin,updateBrandValidator,updateBrand)
.delete(verifyToken,isAdmin,deleteBrandValidator,deleteBrand);


module.exports = router;