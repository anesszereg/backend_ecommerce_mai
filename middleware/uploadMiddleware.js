const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|webp/;


  // Check extension
  // filetypes.test(path.extname(file.originalname).toLowerCase());
  // return true or false
  //  if true: 
  //  cb(null, true);
  //  if false: 
  //  cb(null, false);


  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());


  // Check mime type explain: 
  // filetypes.test(file.mimetype);   return true or false
  //  if true: 
  //  cb(null, true);
  //  if false: 
  //  cb(null, false);


  const mimetype = filetypes.test(file.mimetype);




  if (mimetype && extname) {
    return cb(null, true);


  } else {
    cb(new Error('Images only!'));
  }
}

// Initialize upload
const upload = multer({
  storage: storage,


  limits: { fileSize: 5000000 }, // 5MB



  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
