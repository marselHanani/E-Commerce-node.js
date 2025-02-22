const mongoose = require('mongoose');
const generateSlug = require('../middlewares/generateSlug');

const brandSchema = mongoose.Schema({
    name: { type: String,minlength:3,maxLength:20, required: true ,unique: true},
    slug:{type:String, lowercase:true},
    image:String
    },
    { timestamps: true }
);
generateSlug(brandSchema);
module.exports = mongoose.model('Brand', brandSchema);