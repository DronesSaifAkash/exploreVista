const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    district_code: { type: String, required: true, ref: 'District' }, // This references the District code
    description: { type: String, required: true },
    image: { type: String, required: true } // Path or URL to the image
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
