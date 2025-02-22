const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
                quantity: { type: Number, default: 1, min: 1 }
            }
        ],
        totalPrice: { type: Number, default: 0 }, 
        status: { type: String, enum: ['active', 'checked_out'], default: 'active' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
