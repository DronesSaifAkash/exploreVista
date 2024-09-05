const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  detailsPageLink: { type: String, required: true },
  image: { type: String, required: true } // Path or URL to the image
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
