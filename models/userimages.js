const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userImagesSchema = new Schema (
    {
        filename:String,
        path:String
    },
    {
        timestamps:true
    }
);

const UserImage = mongoose.model("userImage", userImagesSchema);

module.exports = UserImage;