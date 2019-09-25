const User = require('../models/user')
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    getUserAddress:(req,res) =>{
        User
        .find()
        .populate("addresses", "addresses")
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
    getAll:(req,res) =>{
        User.find((error,result)=>{
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
    getOne:(req,res) =>{
        User.findOne({_id: ObjectID(req.body.id)},(error,result)=>{
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
    update:(req,res) =>{
        User.findByIdAndUpdate(ObjectID(req.body.id),req.body,{new: true},(error,result)=>{
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
    hapus:(req,res) =>{
        User.findByIdAndRemove(ObjectID(req.body.id),(error,result)=>{
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
    addUser:(req,res) =>{
        const newUser = new User(req.body)
        newUser.save((error,result)=>{
            if (error){
                res.status(400).send({
                    message:"failed to created new user",
                    error
                });
            }
            else{
                res.status(200).send({
                    message: "user has been created",
                    result
                });
            }
        });
    }
};