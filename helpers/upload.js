const multer = require('multer')
const cloudinaryStorage = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')

const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/jpg' ||file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
        cb(null,true)
    }else {
        const err = new Error('Terdapat Extensi gambar yang tidak sesuai, silahkan cek kembali kelengkapan informasi')
        err.status = 422 
        cb(err, false)
    }
}

const storage = cloudinaryStorage({
    cloudinary : cloudinary,
    folder : "Icpytion2020/",
    allowedFormats: ['jpg', 'png' , 'jpeg' , 'gif'],
    filename : (req,file,cb) => {
        let name = file.originalname + "_" +Date.now()
        cb(null,name)
    }
})

const upload = multer({
    storage,
    limits : {
        fileSize : 1024*1024*5
    },
    fileFilter
})

module.exports = upload