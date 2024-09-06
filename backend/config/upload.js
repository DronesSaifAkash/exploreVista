// config/upload.js
const multer = require('multer');
const path = require('path');

// Create storage engines for different types of uploads
const districtStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/districts/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const destinationStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/destinations/');
  },
  filename: function (req, file, cb) {
    const { name } = req.body; // Extract name from the request body
    const formattedName = name.toLowerCase().replace(/ /g, '-');
    cb(null, `${formattedName}${path.extname(file.originalname)}`); // Use name for the filename
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
};

// Create the upload instances
const uploadDistrict = multer({
  storage: districtStorage,
  fileFilter: fileFilter
});

const uploadDestination = multer({
  storage: destinationStorage,
  fileFilter: fileFilter
});

module.exports = { uploadDistrict, uploadDestination };
