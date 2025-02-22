const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: { type: String,minlength:3,maxLength:50, required: true },
    description: { type: String,minlength:20, required: true },
    price: { type: Number,trim:true,max:2000, required: true },
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number },
    sold: { type: Number, default:0},
    images: [String],
    category: { type: mongoose.Types.ObjectId, ref:"Category", required: true},
    subCategory:[ { type: mongoose.Schema.Types.ObjectId,ref:"SubCategory"}],
    brand: { type: mongoose.Schema.Types.ObjectId,ref:"Brand"},
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema); 