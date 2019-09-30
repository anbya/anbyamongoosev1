const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentImageSchema = new Schema (
    {
        filename:String,
        path:String
    },
    {
        timestamps:true
    }
);

const ContentImage = mongoose.model("contentimages", contentImageSchema);

module.exports = ContentImage;