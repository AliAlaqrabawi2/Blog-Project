const jwt = require("jsonwebtoken") ;

module.exports = function  (req,res,next){

const token = req.header("auth-token")
	if(!token) {
		return res.status(401).send("access delined") ;
	} 
	try { 
		const verfied = jwt.verify(token , process.env.JWT_TOKEN_SECRET)
		req.user = verfied ; 
		next();
		res.send(200).json(verfied)

	} 
	catch(err) { 
		res.status(400).json("Wrong Token")

	} 

}