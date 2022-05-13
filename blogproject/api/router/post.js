const router = require("express").Router() ;
const User = require("../model/User.js") ;  
const Post = require("../model/Post.js");
const verify = require("./verifytoken.js") 

//create 
router.post("/",   async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id" ,async(req,res)=>{   
	const {userId}  =req.body; 
	console.log(req.body);
if (userId === req.params.id) { 
		try{ 
			const post = await Post.findByIdAndUpdate(req.params.id , {$set:req.body} ,{new:true}) ;  

			res.status(200).json(post);

		} 
		catch(err){
		res.status(500).json(err); 

		}
	}
	else {
		res.status(401).json("You can Update Only Your Post")
	}}) ;


router.delete("/:id", async(req,res)=>{ 

if (req.body.userId === req.params.id) { 
		try{ 
			const post = await Post.findByIdAndDelete(req.params.id);  
			res.status(200).json("Deleted");

		} 
		catch(err){
		res.status(500).json(err); 

		}
	}
	else {
		res.status(401).json("You can Delete Only Your Post")
	}}) ;



//get post 
router.get("/:id" , async(req,res)=>{
	try { 
		const post = await Post.findById(req.params.id); 
		res.status(200).json(post);

	} 
	catch (err){
		res.status(500).json(err)
	}


} )

// Get All Post 
router.get("/", async(req,res)=>{
	const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username:username });
    } else if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName],
        },
      }); 
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports =router;