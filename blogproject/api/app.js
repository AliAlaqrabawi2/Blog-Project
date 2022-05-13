const express = require("express") ;
const env = require("dotenv") ; 
const mongoose = require("mongoose"); 
const cors  =require("cors"); 
const multer = require("multer"); 
const path = require("path")
const app = express() ;
env.config();  

const AuthRouter = require("./router/auth");
const UserRouter = require("./router/user"); 
const PostRouter = require("./router/post"); 
const CategoryRouter = require("./router/category");  
app.use(cors());

app.use(express.static("public"));
app.use("/public" ,express.static(path.join(__dirname, "/public")))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
 
const upload = multer({ storage: storage }).single("file");
 
app.post("/upload", upload, (req,res) => { 
    console.log(req.file); 
    console.log(req.body.name);
  res.status(200).json("File has been uploaded");
});


app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Data base Connected");
}); 

app.use("/api/auth",AuthRouter) ; 
app.use("/api/users" ,UserRouter) ; 
app.use("/api/post",PostRouter) ;  
app.use("/api/category",CategoryRouter) ;  



app.listen(5000 , ()=>{console.log("listen on port 5000")}); 


