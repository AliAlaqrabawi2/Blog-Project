const router = require("express").Router() ;
const User = require("../model/User.js") ;  
const Post = require("../model/Post.js");
const bcrypt = require("bcrypt"); 





 //Update 
 router.put("/:id" , async (req,res)=>{ 

 	if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }

 })


//before delete user we should delete all post related to user
 router.delete("/:id" , async(req,res)=>{
 	if (req.body.userId===req.params.id) {  
 		try { 
 			const user = await User.findById(req.params.id); 
 			const post = await Post.deleteMany({username:user.username}); 
 			try {  
 				await User.findByIdAndDelete(req.params.id) ; 
 				res.status(200).json("user has been deleted");

 			} catch (err) { 
 				res.status(500).json(err);

 			}
 		} 
 		catch (err){
 			res.status(500),json("user not found")
 		}


 } else
 	    res.status(401).json("You can Delete Only Your account");



 }
 )


 //Get User 

 router.get("/:id" ,async (req,res)=>{

 	try  { 
 		const user = await User.findById(req.params.id); 
 		const {password , ...others} = user._doc; 
 		res.status(200).json(others) ;

 	} 
 	catch (err) {
 		res.status(500).json(err)
 	}



 })

module.exports = router;
