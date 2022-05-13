const router = require("express").Router(); 
const Category = require("../model/Category.js");


//create category 
router.post("/",async(req,res)=>{ 
	const newCat = new Category(req.body);  
	try {
		const cat = await newCat.save(); 
		res.status(200).json(cat);
	} 
	catch (err){
		res.status(500).json(err)
	}
}) 
router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router;
