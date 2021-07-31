<template>
  <section class="py-2 px-4 flex border-b-2 border-gray-500 items-center">
        <div class="w-10 h-10 mb-4 rounded-full" id="avatar">
            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden"/>
            </div>
        </div>
        <CommentModal v-if="showModal" :tweetId='tweet._id' :comments="comments" @newCommentRecieved='newCommentRecieved' @close-modal='closeModal'/>
        <div class="w-5/6">
            <div class="flex text-sm">
                <h2 class="text-gray-500 mx-1">{{tweet.username}}</h2>
                <p class="text-gray-500 mx-1">{{tweet.username}}</p>
                <p class="text-gray-500">{{updatedDate(tweet.date)}}</p>
            </div>
            <div id="tweet-content" class=" ml-2">
                <p  class="text-sm text-gray-700 my-2 text-left">{{tweet.text}}</p>
            </div>
            <div id="buttons" class="flex text-gray-700">
                <div class="flex mr-5 cursor-pointer" @click="getComments(tweet._id)">
                    <i class="far fa-comment text-green-600"></i>
                    <p class="text-xs mx-1">{{tweet.commentsQty}}</p>
                </div>
                <div class="flex mx-5 cursor-pointer" @click="likeTweet(tweet._id)" :class="indexInWord">
                    <i  :class=" { fas:tweet.likes.indexOf(uid)!=-1 ,far:tweet.likes.indexOf(uid)==-1}" class="fa-heart text-red-500 "></i>
                    <p class="text-xs mx-1">{{tweet.likesQty}}</p>
                </div>
                <div  class="flex ml-5 cursor-pointer " @click="saveTweet(tweet._id)" :class="indexInWord+'bookmark'" >
                    <i class="fa-bookmark" :class=" isTweetSaved(tweet._id) ? 'fas':'far' "></i>
                </div>
            </div>
        </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { TweetFull } from '@/types/Tweet';
import timeago from 'time-ago';
import CommentModal from '@/components/globals/CommentModal.vue';
export default {
    components:{CommentModal},
    props:{
        tweet:{
            type:Object as PropType<TweetFull>,
            required:true
        },
        index:{
            type:Number,
            requred:true
        },
        indexInWord:{
            type:String,
            required:true
        },
        savedTweets:{
            type:Array,
            required:true
        }
    },
    emits:['updateLike'],
    data(){
        return{
            uid:localStorage.getItem('uid'),
            show:true,
            showModal:false,
            comments:[] as Comment[],
        }
    },
    methods:{
        async likeTweet(tweetId:number){
            let result = await fetch(this.$store.state.base_url+'add-like',{
            method:"POST",
            body:JSON.stringify({tweetId,myId:localStorage.getItem('uid')}),
            headers: {"Content-Type": "application/json"}
          });
            let res = await result.json();
            console.log(res);

            if(res.msg == 'tweet_liked'){
                this.$emit('updateLike',this.index,'add');
                this.animateHeart();

            }
            else if(res.msg == 'tweet_unliked'){
                this.$emit('updateLike',this.index,'remove');
                this.animateHeart();
            }
        },
        animateHeart(){
            document.querySelector('.'+this.indexInWord).classList.add('animate__animated');
                document.querySelector('.'+this.indexInWord).classList.add('animate__heartBeat');
                setTimeout(()=>{
                    document.querySelector('.'+this.indexInWord).classList.remove('animate__animated');
                    document.querySelector('.'+this.indexInWord).classList.remove('animate__heartBeat');
                },2500)
        },
        animateBookmark(){
            document.querySelector('.'+this.indexInWord+'bookmark').classList.add('animate__animated');
                document.querySelector('.'+this.indexInWord+'bookmark').classList.add('animate__heartBeat');
                setTimeout(()=>{
                    document.querySelector('.'+this.indexInWord+'bookmark').classList.remove('animate__animated');
                    document.querySelector('.'+this.indexInWord+'bookmark').classList.remove('animate__heartBeat');
                },2500)
        },
        updatedDate(date:string){
            return timeago.ago(date);
        },
        async getComments(tweetId:string){
            console.log(this.comments.length);

             var modalContent:any = document.getElementById('comment_modal');
             //modalContent.style.display='block';
            // reducing the amount of requests. if the comments array is empty we are going to make request
            if(this.comments.length == 0){
                let result = await fetch(this.$store.state.base_url+'get-comments',{
                method:"POST",
                body:JSON.stringify({
                    tweetId:this.tweet._id,
                }),
                headers: {"Content-Type": "application/json"}
            });
            this.showModal = true;
            let res = await result.json();
            this.comments = res.comments;
            }
            this.showModal = true;
        },
        newCommentRecieved(newComment:Comment){
            this.comments.push(newComment);
        },
        closeModal(){
            this.showModal = false;
        },
        async saveTweet(tweetId){
            let result = await fetch(this.$store.state.base_url+'save-tweet',{
            method:"POST",
            body:JSON.stringify({tweetId,uid:localStorage.getItem('uid')}),
            headers: {"Content-Type": "application/json"}
          });
            let res = await result.json();
            if(res.msg == 'tweet saved'){
                this.animateBookmark();
            }

        },
        isTweetSaved(tweetId){
            return this.savedTweets.find(id=> id==tweetId)?true:false;
        }
    },

    mounted(){
        console.log('vooooooooo');
    }
}
</script>

<style scopde>

</style>