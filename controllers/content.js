const Content = require('../models/content')
const ContentImage = require('../models/contentimages')
const ObjectID = require('mongodb').ObjectID;
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")
module.exports = {
    getAllContent:(req,res) =>{
        Content
        .find()
        .populate("contentImages", "filename")
        .populate("users", "name")
        .then((error,result)=>{
            if (error){
                res.status(400).send({
                    error
                });
            }
            else{
                res.status(200).send({
                    result
                });
            }
        });
    },
    getOneContent:(req,res) =>{
        Content.findOne({_id: ObjectID(req.body.id)},(error,result)=>{
            if (error){
                res.status(400).send({
                    error
                });
            }
            else{
                res.status(200).send({
                    result
                });
            }
        });
    },
    updateContent:(req,res) =>{
        Content.findByIdAndUpdate(ObjectID(req.body.id),req.body,{new: true},(error,result)=>{
            if (error){
                res.status(400).send({
                    error
                });
            }
            else{
                res.status(200).send({
                    result
                });
            }
        });
    },
    addContent: async (req,res) => {
        try{
            const newcontent = await Content.create({
                headline:req.body.headline,
                content:req.body.content
            });
            const contentImage = await ContentImage.create({
                filename:req.files[0].filename,
                path:`http://armyali.xyz/multer-image-upload/${req.files[0].filename}`
            });
            const updateContentImages = await Content.findOneAndUpdate(
                {_id: content._id},
                {$push: {contentImg: contentImage._id}},
                {new:true}
            );
            const updateContentUser = await Content.findOneAndUpdate(
                {_id: content._id},
                {$push: {contentUser: req.body.userId}},
                {new:true}
            );
            res.status(200).send({
                mesage:"content has been created",
                newcontent,
                contentImage,
                updateContentImages,
                updateContentUser
            });
        }
        catch (error){
            res.status(400).send({
                message:"failed to created new content",
                error:error.message
            });
        }
    }
};