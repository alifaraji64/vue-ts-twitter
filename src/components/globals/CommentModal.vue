<template>
  <div>
            <section class="p-1">
                <div class="mb-4">
                    <input type="text" placeholder="your comment..." class="border-2 border-gray-400 p-1" v-model="comment">
                    <button class="p-1 rounded-md bg-blue-500 text-white ml-2" @click="addComment(tweetId)">Comment</button>
                </div>
                <div id="comment" class="flex items-center justify-start border-2 border-gray-400 my-1" v-for="(comment,i) in comments" :key="i">
                    <div class="w-10 relative rounded-full" id="avatar">
                        <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden"/>
                        </div>
                </div>
                <p class="ml-4">{{comment.comment}}</p>
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
        }
    },
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
            console.log(res);
            let newComment:Comment = {
                tweetId:res.savedComment.tweetId,
                _id:res.savedComment._id,
                date:res.savedComment.date,
                username:res.savedComment.username,
                comment:res.savedComment.comment
            }
            this.$emit('newCommentRecieved',newComment);
            //this.comments.push(newComment);
        }
    },
}
</script>

<style>

</style>