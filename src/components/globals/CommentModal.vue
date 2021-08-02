<template>
<div id="overlay" class="w-screen min-h-screen bg-gray-300 opacity-50 absolute top-0 left-0 z-10"></div>
  <div id="comment_modal" class="z-20">
          <section class="p-1">
                <div class="mb-4">
                    <input type="text" placeholder="your comment..." class="border-2 border-gray-400 p-1" v-model="comment">
                    <button class="p-1 rounded-md bg-blue-500 text-white ml-2" @click="addComment(tweetId)">Comment</button>
                </div>
                <div id="comment" class="flex items-center justify-start border-2 border-gray-400 my-1" v-for="(comment,i) in comments"
                :key="i">
                    <div class="w-1/12 h-1/3 relative rounded-full" id="avatar" @click="goToProfile(tweet)">
                        <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden"/>
                        </div>
                </div>
                <p class="ml-0 w-11/12">{{comment.comment}}</p>
            </div>
            </section>
        </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import {Comment} from '@/types/Comment'
export default {
    data(){
        return{
            comment:'' as string,
            //comments:[] as Comment[]
        }
    },
    props:{
        tweetId:{
            type:String,
            required:true
        },
        comments:{
            type: Array,
            required:true
        },
        uid:{
            type:String,
            required:true
        }
    },
    emits: ['newCommentRecieved','close-modal'],
    methods:{
       async addComment(tweetId:string){
           if(this.comment == ''){
               return;
           }
            let result = await fetch(this.$store.state.base_url+'add-comment',{
            method:"POST",
            body:JSON.stringify({
                tweetId:this.tweetId,
                comment:this.comment,
                username:localStorage.getItem('username'),
                }),
            headers: {"Content-Type": "application/json"}
          });
            this.comment = '';
            let res = await result.json();
            let uid = this.uid;
            let newComment:Comment = {
                tweetId:res.savedComment.tweetId,
                _id:res.savedComment._id,
                date:res.savedComment.date,
                username:res.savedComment.username,
                comment:res.savedComment.comment,
                uid:uid
            }
            this.$emit('newCommentRecieved',newComment);
        },
        // goToProfile(uid,username){
        //     //clicked uid the same with url param
        //     if(uid != this.$route.params.uid){
        //         //don't change the page
        //         this.$store.commit('SET_USERNAME',username);
        //         this.$router.push('/'+uid);
        //     }
        //     if(uid == localStorage.getItem('uid')){
        //         this.$store.commit('SET_USERNAME','Home');
        //         this.$router.push('/'+uid);
        //         return;
        //     }
        //     this.$store.commit('SET_USERNAME',username);
        // }
    },
    mounted(){
        let overlay = document.getElementById('overlay');
        overlay.addEventListener('click',()=>this.$emit('close-modal'))
    }
}
</script>

<style>
#comment_modal{
    position: absolute;
    max-width:330px;
    min-height: 300px;
    word-wrap: break-word;
    background: white;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
}
</style>