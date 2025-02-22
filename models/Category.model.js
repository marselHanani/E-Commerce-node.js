const mongoose = require('mongoose');
const generateSlug = require('../middlewares/generateSlug');

const categorySchema = mongoose.Schema({
    name: { type: String,minlength:3,maxLength:20, required: true ,unique: true},
    slug:{type:String, lowercase:true},
    image:String
    },
    { timestamps: true }
);
generateSlug(categorySchema);
module.exports = mongoose.model('Category', categorySchema);