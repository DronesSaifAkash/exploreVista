const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // e.g., '3 days', '1 week'
    image: { type: String }, // URL or path to image
    available: { type: Boolean, default: true }, // Whether the package is available
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);

module.exports = TourPackage;
