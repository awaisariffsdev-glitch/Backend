const mongoose = require("mongoose");


const statusSchema = mongoose.Schema({
    icon:{type:String,required:true},
    name:{type:String,required:true}
});

const Status = mongoose.model("Status",statusSchema);
module.exports = Status;