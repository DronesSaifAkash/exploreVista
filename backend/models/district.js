const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: [
      {
          icon: { type: String, required: true }, // FontAwesome icon class
          text: { type: String, required: true }  // Description text
      }
  ],
    touringSpots: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true }
        }
    ]
});

const District = mongoose.model('District', districtSchema);

module.exports = District;