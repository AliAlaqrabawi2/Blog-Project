const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/User.js") ; 
const jwt = require("jsonwebtoken")



//Register 
router.post("/register", async(req,res)=>{

	try {	
		const salt = await bcrypt.genSalt(10) ;
		const hashpassword = await bcrypt.hash(req.body.password ,salt);

		const newUser = new User({
			username:req.body.username , 
			email:req.body.email , 
			password :hashpassword
		}) ;
		const user = await newUser.save() ; 
		res.status(200).json(user);
 
	} 
	catch(err){
			res.status(500).json(err) 
			// 500 is mean that there is an error in DB or Express 
	}


})


router.post("/login" ,async(req,res)=>{ 
	try {
		const user =await User.findOne({email:req.body.email});  
		if (!user){
			return res.status(400).json("user Not Found ") ;
		}
		const validate = await bcrypt.compare(req.body.password , user.password) ;
		if (!validate){ 
			return res.status(400).json("Wrong Login") ;

		}   
		const {password , ...others} = user._doc ;   
		const token = jwt.sign(others , process.env.JWT_TOKEN_SECRET ) ; 
		res.header("auth-token" , token);
		res.status(200).json({token , user}) 



	} 

	catch(err){
		res.status(500).send(err);

	}
})

module.exports = router;
