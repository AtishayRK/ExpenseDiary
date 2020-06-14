const mongoose=require("mongoose");
const schema=mongoose.Schema({
    name:String,
    budget : Number,
    warn : Number
})
module.exports=mongoose.model("set",schema);