const express = require('express')

const router = express.Router()

const {addUser,getAll,getOne,update,hapus,getUserAddress,uploadImage,addUserWithImage,loginUser} = require("../controllers/user")

const upload=require("../config/multer")

const authentication = require("../helpers/auth")

router.get("/", authentication.tokenValid,getAll);
router.get("/byaddress", getUserAddress);
router.get("/id", getOne);
router.post("/", addUser);
router.put("/", update);
router.delete("/", hapus);
router.post("/upload-image", upload.any(),uploadImage);
router.post("/user-with-image", upload.any(),addUserWithImage);
router.post("/login", loginUser);

module.exports = router;