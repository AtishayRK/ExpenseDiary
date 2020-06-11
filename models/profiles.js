const mongoose=require("mongoose");
const schema=mongoose.Schema({
    name:String,
    profiles :{
        type: [String],
        required : true
    }
})
module.exports=mongoose.model("profiles",schema);