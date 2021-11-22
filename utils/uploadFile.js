const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadFile = multer({
    storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter
});

module.exports = uploadFile;