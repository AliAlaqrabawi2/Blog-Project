import Vue from "vue" ;
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);

 const store = new Vuex.Store({
	state :{
		user: null  || JSON.parse(localStorage.getItem("user"))   ,
		token : localStorage.getItem("token")  || null  , 
	} , 
	getters:{
		isLogin(state){
			return !!state.token;

		}
	} , 
	mutations :{
		logout(){ 
			window.localStorage.clear();  
			router.push("/");

		} , 
		setUser(state ,user)  { 
			state.user = user; 
		} , 
		setToken (state,token) {  
			state.token=token;
		} , 
		
	}
	
});


export default store ;