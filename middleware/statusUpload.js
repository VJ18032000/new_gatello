const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/status')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg"|| file.mimetype=='video/mp4') {
            callback(null, true)
        } else {
            console.log("only jpg & png file suppoted!")
            callback(null, false)
        }
    }
})
module.exports = upload