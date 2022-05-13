<template>
  <div id="home">

    <form @submit.prevent="login()">
        <input type="email" name="email" v-model="email">
        <input type="password" name="password" v-model="password">
        <input type="submit" value="submit">

    </form>

  </div>
</template>

<script> 
import axios from "axios";
import {  mapMutations, mapGetters} from "vuex"
export default {
  name: "home",
  data(){
    return {
      email:"" , 
      password:""  , 
      user:null
    }
  } , 
  methods: { 
      ...mapMutations(["setUser" ,"setToken"]) , 


    login () { 
    
    axios.post("http://localhost:5000/api/auth/login" , {email:this.email , password :this.password}).then(res=>{   
            this.user = res.data.user; 
            this.setUser(this.user); 
            this.setToken(this.user);
          localStorage.setItem("token", res.data.token);    
          localStorage.setItem("user", JSON.stringify(res.data.user));  
          this.$router.push("/").catch(()=>{});
        }).catch((err)=>{
        console.log(err);  
                    this.$router.push("/login").catch(()=>{});

          })       




 
    }   , 
        
  } ,  
    computed :{
    ...mapGetters(["isLogin"])

  } , 
  
 
};
</script>


<style scoped>
</style>