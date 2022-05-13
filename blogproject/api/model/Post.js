const mongoose = require("mongoose") ;

const Postschema  = new mongoose.Schema({   
        title:{
            type:String , 
            required:true, 
            unique:true
        } , 
        description :{
            type:String , 
            required :true  
        }  , 
        photo : {
            type:String ,
            

        } ,  
        username:{ 
            type:String,  
            required:true

        } , 
        category :{
            type:Array  
        }


} , {timestamps:true})

module.exports = mongoose.model("Post" , Postschema);

