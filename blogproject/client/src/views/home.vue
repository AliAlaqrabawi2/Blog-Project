<template>
  <div id="home">
    <Header />
    <div class="container">
      <posts :posts="posts" />
      <sidebar />
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import sidebar from "../components/sidebar";
import posts from "../components/posts"; 
import axios from "axios"; 
export default {
  name: "home",
  components: {
    Header,
    sidebar,
    posts,
  },  
  data(){
    return {
      posts:[] ,
    }
  } ,

  methods:{ 
   async fetchPost(){ 
    const query = document.location.search ;
      this.posts = await axios.get(`http://localhost:5000/api/post/${query}` ) ;   
      this.posts = this.posts.data ;    
    }
  } , 
  created (){   
      this.fetchPost() ; 

  } ,  

};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  padding-top: 60px;
}
</style>