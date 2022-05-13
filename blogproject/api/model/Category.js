const mongoose = require("mongoose") ;

const Categoryschema  = new mongoose.Schema({   
        name:{
            type:String , 
            required:true, 
        } 


} , {timestamps:true})

module.exports = mongoose.model("Category" , Categoryschema);

