const mongoose=require('mongoose');

const schema=mongoose.Schema({
    
    item:{
        type : String,
        required :true
    },
    amt :
    {
        type : Number,
        required : true
    },
     date : {
         type : Date
     },
    profile : String,
    name : String
})
module.exports=mongoose.model('budgetItem',schema);