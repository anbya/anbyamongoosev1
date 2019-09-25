const Adresses = require('../models/address')
const User = require('../models/user')
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    addAddress: async (req,res) => {
        const addresses = await Adresses.create({
            addresses:req.body.addresses
        });
        const user = await User.findOneAndUpdate(
            {_id: req.body.id},
            {$push: {addresses: addresses._id}},
            {new:true}
        );
        res.status(200).send({
            messages:"Address created successfully",
            addresses,
            user
        });
    }
};