<template>
  <main class="min-h-screen flex overflow-hidden">
      <div class="w-1/2 min-h-full bg-blue-500 flex justify-center items-center">
        <i class="fab fa-twitter fa-7x text-white"></i>
      </div>
      <div class="W-1/2 min-h-full flex flex-col items-start">
        <div class="ml-16 my-10">
            <i class="fab fa-twitter fa-2x text-blue-500"></i>
        </div>
        <div class="ml-16 my-10">
            <h1 class="text-7xl text-gray-800 font-bold">Happenig now</h1>
        </div>
        <div class="ml-16 my-10">
            <h1 class="text-2xl text-gray-800 font-bold">join twitter today</h1>
        </div>
        <div class="my-2 ml-16">
            <button @click="showRegisterModal=true;showModal=true" class="text-white bg-blue-500 text-lg w-72 rounded-3xl py-2 hover:bg-blue-600">
                Register
            </button>
        </div>
        <div class="my-2 ml-16">
            <button @click="showLoginModal=true;showModal=true" class="text-blue border-2 border-blue-500 text-blue-500 text-lg w-72 rounded-3xl py-2 hover:bg-blue-200">
                Login
            </button>
        </div>
      </div>
  </main>
  <transition name="fade">
      <app-child v-if="showModal" id="overlay" @click="showModal=false;showLoginModal=false;showRegisterModal=false" class="modal absolute top-0 bottom-0 left-0 right-0 max-w-screen max-h-screen bg-blue-200 opacity-50 overflow-hidden">
      </app-child>
  </transition>
  <transition name="slide">
      <app-child v-if="showLoginModal" id="modal" class="w-64 h-64 bg-white absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        <h1 class="text-xl font-bold">Login</h1>
        <p class="text-red-500">{{errorMsg}}</p>
        <input type="text" v-model="loginInfo.email" placeholder="email" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="password" v-model="loginInfo.password" placeholder="password" class="p-1 border-2 border-blue-500 rounded-3xl mt-1 mb-10 focus:outline-none">
        <button @click="login" class="text-white bg-blue-500 text-lg w-48 rounded-3xl py-2 hover:bg-blue-600">
                    Login
        </button>
      </app-child>
  </transition>
  <transition name="slide">
      <app-child v-if="showRegisterModal" id="modal" class="w-64 h-72 bg-white absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        <h1 class="text-xl font-bold">Register</h1>
        <p class="text-red-500">{{errorMsg}}</p>
        <input type="text" v-model="registerInfo.email" placeholder="email" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="text" v-model="registerInfo.username" placeholder="username" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="password" v-model="registerInfo.password" placeholder="password" class="p-1 border-2 border-blue-500 rounded-3xl mt-1 mb-10 focus:outline-none">
        <button class="text-white bg-blue-500 text-lg w-48 rounded-3xl py-2 hover:bg-blue-600" @click="register">
                    register
        </button>
      </app-child>
  </transition>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent ({

    data(){
        return{
            showModal:false as boolean,
            showLoginModal:false as boolean,
            showRegisterModal:false as boolean,
            registerInfo:{
              username:'' as string,
              email:'' as string,
              password:'' as string,
            },
            loginInfo:{
              email:'' as string,
              password:'' as string
            },
            errorMsg:'' as string
        }
    },
    methods:{
      async register(){
        //console.log(store);
        this.errorMsg = '';
        if(!this.registerInfo.username || !this.registerInfo.email || !this.registerInfo.password){
          this.errorMsg = 'please fill all of the fields'
          return;
        }
          let result = await fetch(this.$store.state.base_url+'register',{
            method:"POST",
            body:JSON.stringify({username:this.registerInfo.username, email:this.registerInfo.email, password:this.registerInfo.password}),
            headers: {"Content-Type": "application/json"}
          });
          let res = await result.json();
          //handle error
          res['errorMsg'] ? this.errorMsg = res.errorMsg:null;
          //handle success
          if(res['token']){
            localStorage.setItem('jwt',res['token'])
            this.$router.push('/');
          }


      },
      async login(){
        this.errorMsg = '';
        if(!this.loginInfo.email || !this.loginInfo.password){
          this.errorMsg = 'please fill all of the fields'
          return;
        }
        let result = await fetch(this.$store.state.base_url+'login',{
            method:"POST",
            body:JSON.stringify({email:this.loginInfo.email, password:this.loginInfo.password}),
            headers: {"Content-Type": "application/json"}
          });
          let res = await result.json();
          //handle error
          res['errorMsg'] ? this.errorMsg = res.errorMsg:null;
          //handle success
          if(res['token']){
            localStorage.setItem('jwt',res['token'])
            this.$router.push('/');
          }
      }
    }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from, .slide-leave-to {
  transform: rotateZ(180deg) translate(400px);
  opacity: 0;
}

</style>