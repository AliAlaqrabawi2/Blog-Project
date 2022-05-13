<template>
  <div id="singlepost">
    <div class="single-post-container">
      <img :src="uploadImg()" class="single-post-img" />
      <div class="single-post-header">
        <h1 class="single-post-title" v-if="!Edited">{{post.title}}</h1>
        <input type="text" v-model="post.title" v-if="Edited" class="singlePostTitleEdit">
        <div class="single-post-edit" v-if="post.username===(user && user.username )">
          <button class="btn" @click="Edited=!Edited">Edit</button>
          <button class="btn" @click="deletePost()">Delete</button>
        </div>
      </div>
      <div class="single-post-info">
        <span class="single-post-author">Author : 
        <router-link :to="`/?user=${post.username}`" class="link">
        <b>{{post.username}}</b>
        </router-link>
        </span>
        <span class="single-post-date">{{new Date(post.createdAt).toDateString()}}</span>
      </div>
      <textarea v-if="Edited" v-model="post.description"></textarea>
      <p class="single-post-description" v-if="!Edited">
        {{post.description}}
      </p> 

    </div>  
    <button v-if="Edited" @click="UpdatedPost()">Edit Post</button>

  </div>
</template>

<script> 
import axios from "axios" ;
import {mapState} from "vuex"
export default {  
  data(){
    return { 
      post:{} , 
      title:"" , 
      description :""  ,
      Edited :false 
    }
  } , 
  computed:{
    ...mapState(["user"])
  } ,
  created (){ 
   this.getPost();  
  }  ,  

methods: {
  async getPost(){
    const postId = this.$route.params.id;
    this.post = await axios.get(`http://localhost:5000/api/post/${postId}`);  
    this.post=this.post.data ; 
  } ,  
  async deletePost(){
    const res =    await axios.delete(`http://localhost:5000/api/post/${this.post._id}` ,{ data: { userId: this.post._id } }) ; 
      this.$router.push(`/`)
    console.log(res);
    } ,
  async UpdatedPost(){    
      try {

                await axios.put(`http://localhost:5000/api/post/${this.post._id}` ,
           {   userId:this.post._id ,title:this.post.title , description: this.post.description  }) ;  

                this.Edited =false;


      }
      catch (err){
        console.log(err)
      }

      },

  uploadImg(){
    if (!this.post.photo) 
       return require( "../assets/header.jpg")

     return  `http://localhost:5000/public/${this.post.photo}` 
    }

} 


};
</script>

<style>
#singlepost {
  flex: 9;
}
.single-post-container {
  margin: 0px 25px 40px 25px;
}
.single-post-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}
.single-post-header {
  margin-left: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.single-post-title {
  font-size: 30px;
}
.single-post-edit {
  margin-top: 20px;
}
.btn {
  padding: 10px;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
}
.single-post-info {
  margin: 20px 10px;
  display: flex;
  justify-content: space-between;
}
.single-post-description {
  color: #666;
  font-size: 18px;
}
.single-post-description:first-letter {
  font-size: 30px;
  color: #000;
  margin-left: 20px;
} 
.link { 
  text-decoration:none;
  color:inherit;
} 

.singlePostTitleEdit{
  padding:10px; 
  font-size:28px;

}
</style> 
