const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
                quantity: { type: Number, default: 1, min: 1, required: true }
            }
        ],
        status: {type: String,enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'], 
            default: 'pending' 
        }, 
        totalPrice: { type: Number, required: true },
        orderDate: { type: Date, default: Date.now },
        shippingAddress: { type: String, required: true },
        paymentMethod: {type: String, enum: ['credit_card', 'paypal', 'cash_on_delivery'], required: true},
        paymentStatus: {type: String,enum: ['pending', 'paid', 'failed'],default: 'pending'}, 
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
