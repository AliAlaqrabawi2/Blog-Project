import VueRouter from "vue-router";
import Vue from "vue";
import home from "./views/home";
import write from "./views/write.vue";
import setting from "./views/setting"; 
import post from "./views/single.vue";
import login from "./views/login";
import store from "./store"
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: home
    },
    {
      path: "/write",
      component: write ,
       beforeEnter(to, from, next) {  
       console.log(to, from); 
        if (store.getters["isLogin"]) {   
          next();
        }  
        else { 
          next({path:"/login"});
        }

      }

  
} , 
    {
      path: "/setting",
      component: setting
    } , 
    {
      path:"/api/post/:id" ,  
      name:post ,
      component :post  
     } , 
     {
      path:"/login" , 
      name:"login" , 
      component:login
     }  , 
  ]
});

export default router;
