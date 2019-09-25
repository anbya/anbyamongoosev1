var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema(
    {
        addresses:{ type:String, required:true}
    },
    {
        timestamps:true
    }
);

const Adresses = mongoose.model("addresses", addressSchema);

module.exports = Adresses;