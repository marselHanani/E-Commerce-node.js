const mongoose = require('mongoose');
const generateSlug = require('../middlewares/generateSlug');

const subCategorySchema = mongoose.Schema({
    name: { type: String, minlength: 3, maxLength: 32, required: true, unique: true },
    slug: { type: String, lowercase: true },
    category: { type: mongoose.Types.ObjectId, ref:"Category", required: true},
}, { timestamps: true });

generateSlug(subCategorySchema);

subCategorySchema.post('save', async (doc)=> {
    try {
        await mongoose.model('Product').updateMany(
            { category: doc.category },              
            { $addToSet: { subCategory: doc._id } } 
        );
        console.log(`SubCategory ${doc.name} linked to related products.`);
    } catch (err) {
        console.error('Error while linking SubCategory to products:', err);
    }
});
module.exports = mongoose.model('SubCategory', subCategorySchema);