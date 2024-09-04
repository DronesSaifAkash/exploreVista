const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true } // Path or URL to the thumbnail image
});

const District = mongoose.model('District', districtSchema);

module.exports = District;