var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema(
    {
        headline:String,
        content:String,
        contentImg:[{
            type: Schema.Types.ObjectId,
            ref:"contentimages"
        }],
        contentUser:[{
            type: Schema.Types.ObjectId,
            ref:"users"
        }],
    },
    {
        timestamps:true
    }
);

const Content = mongoose.model("contents", contentSchema);

module.exports = Content;