const multer = require("multer");
var sftpStorage = require('multer-sftp');
const storage = sftpStorage({
    sftp: {
      host: 'armyali.xyz',
      port: 22,
      username: 'armyalix',
      password: 'kPqk1p5I84'

    },
    destination: function(req,file,cb){
        cb(null,"./public_html/content-images/");
    },
    filename: function(req,file,cb){
        let fileType="";
        if (file.mimetype === "image/png"){
            fileType="png";
        }
        if (file.mimetype === "image/jpeg"){
            fileType="jpg";
        }
        cb(null,file.originalname);
    }
});

const uploadContent=multer({storage:storage})

module.exports = uploadContent;