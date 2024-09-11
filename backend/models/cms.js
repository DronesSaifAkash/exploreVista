const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  page: { type: String, required: true },  // e.g., 'about-us'
  title: { type: String, required: true }, // e.g., 'About Us'
  content: { type: String, required: true } // HTML or plain text
});

module.exports = mongoose.model('CMS', cmsSchema);
