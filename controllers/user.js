const User = require('../models/user')
const UserImage = require('../models/userimages')
const ObjectID = require('mongodb').ObjectID;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
    addUser: async (req,res) => {
        try {
            const existedUser = await User.findOne({
                name:req.body.name
            });
            if (existedUser){
                res.status(404).send({
                    message:"user already exist, please continue to login"
                });
            }
            else{
                bcrypt.genSalt(10, function(err,salt){
                    bcrypt.hash(req.body.password, salt, async function (err, hash){
                        if(!err){
                            const newUser = await User.create({
                                name:req.body.name,
                                email:req.body.email,
                                phoneNumber:req.body.phoneNumber,
                                password:hash
                            });
                            res.status(200).send({
                                mesage:"user has been created",
                                newUser
                            });
                        }
                    })
                });
            }
        }
        catch (error){
            res.status(400).send({
                message:"failed to created new user",
                error:error.message
            });
        }
    },
    // uploadImage:(req,res) => {
    //     UserImage.create({
    //         filename:req.files[0].filename,
    //         path:req.files[0].path
    //     })
    //     .then(result => res.send(result)).catch(error => res.send(error))
    // }
    uploadImage:(req,res) => {
        UserImage.create({
            filename:req.files[0].filename,
            path:req.files[0].path
        })
        .then(result => res.send(result)).catch(error => res.send(error))
    },
    addUserWithImage: async (req,res) => {
        try{
            const user = await User.create(req.body);
            const userPict = await UserImage.create({
                filename:req.files[0].filename,
                path:`http://armyali.xyz/multer-image-upload/${req.files[0].filename}`
            });
            const updateUser = await User.findOneAndUpdate(
                {_id: user._id},
                {$push: {userImg: userPict._id}},
                {new:true}
            );
            res.status(200).send({
                mesage:"user has been created",
                user,
                userPict,
                updateUser
            });
        }
        catch (error){
            res.status(400).send({
                message:"failed to created new user",
                error:error.message
            });
        }
    },
    loginUser: async (req,res) => {
        const existedUser = await User.findOne({
            name:req.body.name
        });
        try{
            const valid = bcrypt.compareSync(req.body.password, existedUser.password);
            if(valid){
                const token = await jwt.sign(
                    {
                        data:existedUser
                    },
                    "jangansampaioranglaintau",
                    {
                        expiresIn:"1h"
                    }
                );
                res.send({
                    token
                })
            } else {
                res.send({message:"password is invalid"});
            }
        }
        catch (error){console.log(error)
            res.status(400).send({
                message:"cannot find user name",
                error:error.message
            });
        }
    }
};