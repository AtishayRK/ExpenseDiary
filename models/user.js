const mongoose=require("mongoose");
const schema=mongoose.Schema({
    name:String,
    password :{
        type: String,
        required : true
    }
})
module.exports=mongoose.model("userBudget",schema);