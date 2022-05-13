<template>
  <div class="top">
    <div class="top-left">
      <p>facebook</p>
    </div>
    <div class="top-center">
      <ul class="toplist">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/home">About</router-link>
        </li>
        <li>
          <router-link to="/home">Contact</router-link>
        </li>
        <li>
          <router-link  to="/write">write</router-link>
        </li>
        <li v-if="user"  @click="logout()">
          <router-link to="/login" >logout</router-link>
        </li >   
                <li  v-if="!user">
          <router-link to="/login" >Login</router-link>
        </li >   
                        <li  v-if="!user">
          <router-link to="/login" >Signin</router-link>
        </li >  




      </ul>
    </div>
    <div class="top-right">
    <router-link to="/setting">
      <img src="../assets/model.png" class="right-img" />

    </router-link>
    </div>
  </div>
</template>

<script>
import { mapState , mapMutations  } from "vuex"
export default {
  name: "navbar", 
  methods :{   
    ...mapMutations(["setUser" , "setToken"]) ,
    logout(){
      localStorage.clear() ;  
      this.setUser(null) ; 
      this.setToken(null);
    }
  }  ,
   computed:{
    ...mapState(["user"])
   },   
  
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
}
.top-left,
.top-right {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top .top-center {
  width: 50%;
  display: flex;
  justify-content: center;
}
.toplist {
  display: flex;
  list-style: none;
}
.toplist a {
  text-decoration: none;
  padding: 10px;
  display: inline-block;
  margin-left: 5px;
  color: #888;
  font-size: 20px;
}
.right-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
  border: 1px solid #ccc;
}
</style> 

