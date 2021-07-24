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
        <input type="text" placeholder="email" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="password" placeholder="password" class="p-1 border-2 border-blue-500 rounded-3xl mt-1 mb-10 focus:outline-none">
        <button class="text-white bg-blue-500 text-lg w-48 rounded-3xl py-2 hover:bg-blue-600">
                    Login
        </button>
      </app-child>
  </transition>
  <transition name="slide">
      <app-child v-if="showRegisterModal" id="modal" class="w-64 h-64 bg-white absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
        <h1 class="text-xl font-bold">Register</h1>
        <input type="text" placeholder="email" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="text" placeholder="username" class="p-1 border-2 border-blue-500 rounded-3xl mb-1 focus:outline-none">
        <input type="password" placeholder="password" class="p-1 border-2 border-blue-500 rounded-3xl mt-1 mb-10 focus:outline-none">
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
            showModal:false,
            showLoginModal:false,
            showRegisterModal:false
        }
    },
    methods:{
      async register(){
        //console.log(store);
        console.log(this.$store.state);

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