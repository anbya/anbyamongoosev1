const express = require('express')

const router = express.Router()

const {getAllContent,getOneContent,updateContent,addContent} = require("../controllers/content")

const uploadContent=require("../config/multercontent")

router.get("/", getAllContent);
router.get("/id", getOneContent);
router.put("/", updateContent);
router.post("/add-content", uploadContent.any(),addContent);

module.exports = router;