<template>
  <div id="sidebar">
    <div class="sidebar-item">
      <h3 class="sidebar-title">About Me</h3>
      <img src="../assets/logo.png" />
      <p class="sidebar-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
        provident!
      </p>
    </div>
    <div class="sidebar-item">
      <h3 class="sidebar-title">Category</h3>
      <ul class="categoty"> 
        <li v-for="cat in category" :key="cat._id">
        <router-link :to="`/?cat=${cat.name}`" class="link">{{cat.name}}</router-link>


        </li>
          

      </ul>
    </div>
    <div class="sidebar-item">
      <h3 class="sidebar-title">Follow Us</h3>
      <div class="sidebar-social">
        <p>Facebook</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      category :""
    }  
  }  , 
  methods:{
   async fetchPost(){   
      this.category = await axios.get(`http://localhost:5000/api/category`) ;   
      this.category = this.category.data ;  


    }
  } , 
  created (){
    this.fetchPost();

  }
 
};
</script>

<style>
#sidebar {
  flex: 3;
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
}
.sidebar-title {
  padding: 5px;
  border-top: 3px solid #7878;
  border-bottom: 3px solid #7878;
}
.sidebar-description {
  opacity: 0.6;
  margin: 0 15px;
}
.categoty {
  list-style: none;
  text-align: center;
}
.categoty li {
  width: calc(100% / 2);
  color: #333;
  display: inline-block;
  padding: 10px;
}
</style>