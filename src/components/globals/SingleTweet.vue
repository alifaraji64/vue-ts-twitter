<template>
  <section class="py-2 px-4 flex border-b-2 border-gray-500 items-center">
        <div class="w-10 h-10 relative mb-4 rounded-full" id="avatar">
            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden"/>
            </div>
        </div>
        <div class="w-5/6">
            <div class="flex text-sm">
                <h2 class="text-gray-500 mx-1">{{tweet.username}}</h2>
                <p class="text-gray-500 mx-1">{{tweet.username}}</p>
                <p class="text-gray-500">{{tweet.date}}</p>
            </div>
            <div id="tweet-content" class=" ml-2">
                <p  class="text-sm text-gray-700 my-2 text-left">{{tweet.text}}</p>
            </div>
            <div id="buttons" class="flex text-gray-700">
                <div class="flex mr-5">
                    <i class="far fa-comment"></i>
                    <p class="text-xs mx-1">{{tweet.commentsQty}}</p>
                </div>
                <div class="flex mx-5 cursor-pointer" @click="likeTweet(tweet._id)">
                    <i class="far fa-heart"></i>
                    <p class="text-xs mx-1">{{tweet.likesQty}}</p>
                </div>
                <div class="flex ml-5">
                    <i class="far fa-bookmark"></i>
                </div>
            </div>
        </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { TweetFull } from '@/types/Tweet';
export default {
    props:{
        tweet:{
            type:Object as PropType<TweetFull>,
            required:true
        },
        index:{
            type:Number,
            requred:true
        }
    },
    methods:{
        async likeTweet(tweetId){
            let result = await fetch(this.$store.state.base_url+'add-like',{
            method:"POST",
            body:JSON.stringify({tweetId,myId:localStorage.getItem('uid')}),
            headers: {"Content-Type": "application/json"}
          });
            let res = await result.json();
            if(res.code == 200){
                this.$emit('updateLike',this.index)
            }


        }
    },
    mounted(){
        //console.log(this.index);

    }
}
</script>

<style>

</style>