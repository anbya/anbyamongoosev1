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
        cb(null,"./public_html/multer-image-upload/");
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
        // cb(null,`http://armyali.xyz/multer-image-upload/${file.originalname}`);
    }
});
// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,"./assets/images/user/");
//     },
//     filename: function(req,file,cb){
//         let fileType="";
//         console.log(file);
//         if (file.mimetype === "image/png"){
//             fileType="png";
//         }
//         if (file.mimetype === "image/jpeg"){
//             fileType="jpg";
//         }
//         //ini pakai nama asil si gambar
//         cb(null,file.originalname);
//         //ini kalau pakai nama baru
//         // cb(null,`ininamafotobaru.${fileType}`);
//     }
// });

const upload=multer({storage:storage})

module.exports = upload;