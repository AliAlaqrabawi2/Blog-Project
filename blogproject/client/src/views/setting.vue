<template>
  <div class="settings">
    <div class="settingsWrapper">
      <div class="settingsTitle">
        <span class="settingsTitleUpdate">Update Your Account</span>
        <span class="settingsTitleDelete">Delete Account</span>
      </div>
      <form class="settingsForm" @submit.prevent ="editInformation()">
        <label>Profile Picture</label>
        <div class="settingsPP">
          <img :src="showImg()" alt=""  class="profilePic"/>
          <input @change="uploadImg($event)" ref="inputImg" id="fileInput" type="file" class="settingsPPInput" style="display:none" />
          <button type="button" @click="$refs.inputImg.click()">Change Profile Picture</button>
        </div>
        <label>Username</label>
        <input type="text" :placeholder="user.username" name="name" v-model="user.username"/>
        <label>Email</label>
        <input type="email" :placeholder="user.email" name="email" v-model="user.email" />
        <label>Password</label>
        <input type="password" placeholder="Password" name="password" v-model="Password" />
        <button class="settingsSubmitButton" type="submit">Update</button>
      </form>
    </div>
    <sidebar />
  </div>
</template>

<script>
import axios from "axios";
import sidebar from "../components/sidebar";
import {mapState  , mapMutations} from "vuex"
export default {
  components: {
    sidebar,
  },  
  data(){
    return  {
      selectedFile:"" , 
      src:""  ,
      Password :""
    } 
  } , 
  methods :{  

    ...mapMutations(["changeUsername" , "changeEmail"]) , 

     async editInformation (){
        if (this.src) {
          const fd = new FormData(); 
          const filename = Date.now()+this.selectedFile; 
          fd.append("name" ,filename);
        fd.append("file", this.selectedFile) ;   
          try {
           axios.post("http://localhost:5000/upload" , fd) 
          }  
          catch (err){
            console.log(err);
          }
         } 
         try {  
          localStorage.setItem('user', JSON.stringify(this.user));
         await axios.put(`http://localhost:5000/api/users/${this.user._id}` ,{userId:this.user._id , username:this.user.username , email:this.user.email , password:this.password})  
         this.$router.push("/");
         } 
         catch(err) {
          console.log(err)
         }

      } , 
     async deleteUser (){

        await axios.delete(`http://localhost:5000/api/users/${this.user._id}` ,{userId:this.user._id})
          localStorage.clear(); 

      } , 

    uploadImg (event){
      this.selectedFile  = event.target.files[0];
      this.src = URL.createObjectURL(this.selectedFile) ; // To Preview img in front end before upload it
        this.showImg();
    } , 
    showImg(){ 
    if (this.src)
       return this.src

    if (!this.user.profilePic) 
       return require( "../assets/header.jpg")
 
     return  `http://localhost:5000/public/${this.user.profilePic}` 
    } 


    } , 

  computed :{
    ...mapState(['user']), 
    

  }
};
</script>

<style scoped>
.settings {
  display: flex;
}

.settingsWrapper {
  flex: 9;
  padding: 20px;
}

.settingsTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settingsTitleUpdate {
  font-size: 30px;
  margin-bottom: 20px;
  color: lightcoral;
}

.settingsTitleDelete {
  color: red;
  font-size: 12px;
  cursor: pointer;
}

.settingsForm {
  display: flex;
  flex-direction: column;
}

.settingsPP {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.settingsPP > img {
  height: 70px;
  width: 70px;
  border-radius: 20px;
  object-fit: cover;
}

.settingsPPIcon {
  width: 25px;
  height: 25px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  margin-left: 10px;
  color: white;
  background-color: lightcoral;
  cursor: pointer;
}

.settingsPPButton:focus {
  outline-style: none;
}

.settingsForm > label {
  font-size: 20px;
  margin-top: 20px;
}

.settingsPPInput {
  width: 30%;
}

.settingsForm > input {
  color: gray;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 30px;
  border: none;
  border-bottom: 1px solid lightgray;
}

.settingsSubmitButton {
  align-self: center;
  width: 150px;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: teal;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settingsSubmitButton:hover {
  background-color: rgb(1, 114, 114);
} 
.profilePic{
  object-fit:cover;
}
</style>