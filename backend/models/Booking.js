const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tourPackageId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    bookingDate: { type: Date, default: Date.now },
    visitDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfMembers: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    discountApplied: { type: String },
    status: {
        type: String,
        enum: ['pending', 'verified', 'canceled'],
        default: 'pending', // Default status is pending
    },
});

module.exports = mongoose.model('Booking', bookingSchema);
