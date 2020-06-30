const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        address: { type: String },
        name: { type: String },
        phone: { type: String, required: true }
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('Order', orderSchema)