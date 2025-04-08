const multer = require('multer'); // Using require

const storage = multer.memoryStorage();

module.exports = {
  singleUpload: multer({ storage }).single('file')
};
