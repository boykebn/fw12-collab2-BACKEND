// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, require('path').join(process.cwd(), 'assets/uploads'))
//     },
//     filename: (req, file, callback) => {
//         const getExtension = file.originalname.split('.');
//         const extension = getExtension[getExtension.lenght - 1]
//         const name = `${new Date().getDate()}_${new Date().getTime()}.${extension}`
//         callback(null, name)
//     }
// })

// const upload = multer({
//     storage,
//     limits: { fileSize: 1000000},
//     fileFilter: (req, file, callback) => {
//         const format = ['jpg', 'png', 'jpeg']
//         const extension = file.originalname.split('.')
//         const cekFormatFile = format.includes(extension[extension.length-1])
//         if(!cekFormatFile){
//             return callback(new Error('Format picture not valid'))
//         } else {
//             return callback(null, true)
//         }
//     }
// })

// const uploadMiddleware = upload.single("picture")

// module.exports = (req, res, next) => {
//     uploadMiddleware(req, res, (error) => {
//         if(error){
//             return res.status(400).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//         next()
//     }) 
// }

const multer = require("multer");
const errorHandler = require("../helper/errorHandler.helper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.split(".");
    const ext = extention[extention.length - 1];
    const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
    cb(null, name);
  },
});

const limit = 1024 * 1024;

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only png,jpg and jpeg format allowed"), false);
    }
  },
  limits: { fileSize: limit },
});

const uploadMiddleware = upload.single("picture");

module.exports = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return errorHandler(err, res);
    }
    next();
  });
};
