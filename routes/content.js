const express = require('express')

const router = express.Router()

const {getAllContent,getOneContent,updateContent,addContent,getContentPopulate} = require("../controllers/content")

const upload=require("../config/multer")

router.get("/", getAllContent);
router.get("/populate", getContentPopulate);
router.get("/id", getOneContent);
router.put("/", updateContent);
router.post("/add-content", upload.any(),addContent);

module.exports = router;