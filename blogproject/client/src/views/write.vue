<template>
  <div id="write">
    <img v-if="selectedFile" :src="src" class="write-img"  />
    <form class="write-form"  @submit.prevent="createPost()"> 
          <input type="file" ref="fileInput" accept="image/jpeg" @change=uploadImage style="display:none" >
      <div class="write-form-groub">
      <button @click="$refs.fileInput.click()" type="button" >Upload Img</button>
        <input type="text" placeholder="Title" class="write-input" v-model="title" />
      </div>
      <div class="write-form-groub">
        <textarea v-model="description"
          placeholder="Tell Your Story"
          type="text"
          class="write-input write-text"
        ></textarea>
      </div>
      <button type="submit" class="btn">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"; 
import {mapState } from "vuex";
export default {
  data(){
    return {
      title:"" , 
      description :"" , 
      selectedFile :"" , 
      filename : ""  ,
      src : ""


    }
  } , 
  methods:{
   async createPost(){ 

      const post = {
        title:this.title , 
        description:this.description ,  
        username:this.user.username  ,
      } 
              
              if (this.selectedFile) {
                 const fd = new FormData();  
               fd.append("name" , this.filename);
        fd.append("file", this.selectedFile) ; 
        post.photo =this.filename ; 
        await axios.post("http://localhost:5000/upload" ,  fd);

            }

      const res = await axios.post("http://localhost:5000/api/post" ,post ) 
      this.$router.push(`/api/post/${res.data._id}`)
    } ,   
    uploadImage(event){     
        this.selectedFile= event.target.files[0];   
               this.filename = Date.now()+this.selectedFile.name  
               this.src = URL.createObjectURL(this.selectedFile)


}



  } , 
  computed :{
    ...mapState(["user"])
  } 
 

};
</script>

<style scoped>
.write {
  padding-top: 80px;
}
.write-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.write-form-groub {
  margin-left: 150px;
  display: flex;
  align-items: center;
}
.write-input {
  font-size: 30px;
  padding: 2px;
  width: 50vw;
  outline: none;
  border: 1px solid #777;
  margin: 10px;
}
.write-text {
  width: 70vw;
  height: 50vh;
  font-family: inherit;
  font-size: 20px;
}
.btn {
  position: absolute;
  top: 20px;
  right: 50px;
  color: white;
  background-color: teal;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.write-img {
  margin-left: 150px;
  width: 70vw;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
}
</style>