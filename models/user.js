var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name:String,
        password:String,
        email:String,
        phoneNumber:String,
        addresses:[{
            type: Schema.Types.ObjectId,
            ref:"addresses"
        }]
    },
    {
        timestamps:true
    }
);

const User = mongoose.model("users", userSchema);

module.exports = User;