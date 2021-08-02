<template>
  <div class="min-h-screen bg-gray-50 w-1/2 border-2 border-gray-500">
    <header class="flex justify-between items-center border-b-2 border-gray-500 px-4 py-2">
        <h2 class=" text-xl font-semibold text-gray-800">{{username}}</h2>
        <i class="fas fa-bahai text-purple-500"></i>
    </header>
    <MyTweetInput v-if="!uid"/>
    <SingleTweet v-for="(tweet,i) in tweetsFull" :key="i" :savedTweets='savedTweets' :tweet='tweet' :index='i' :indexInWord='convertToWord(i)' @updateLike='updateLike'/>

  </div>
</template>

<script lang='ts'>
import MyTweetInput from '@/components/globals/MyTweetInput.vue'
import SingleTweet from '@/components/globals/SingleTweet.vue'
import {TweetFull} from '@/types/Tweet'
import converter from 'number-to-words'
export default {
    data(){
      return{
        //tweets+like+comment = tweetsfull
        tweetsFull:[],
        tweets:[],
        savedTweets:[],
        uid:'',
        // Comments:[]
      }
    },
    components:{MyTweetInput,SingleTweet},
    methods:{
      updateLike(index,type){
        if(type=='add'){
          this.tweetsFull[index].likesQty++;
          //for color of heart
          this.tweetsFull[index].likes.push(localStorage.getItem('uid'));
        }
        if(type=='remove'){
          this.tweetsFull[index].likesQty--;
          //for color of heart
          this.tweetsFull[index].likes = this.tweetsFull[index].likes.filter(
            item => item !== localStorage.getItem('uid')
          )
        }
      },
      convertToWord(index:number){
        return converter.toWords(index);
      },
      async fetchInfo(){
        let result = await fetch(this.$store.state.base_url+'get-tweets'+(this.uid?`/${this.uid}`:''),{
            method:"GET",
            headers: {"Content-Type": "application/json"}
          });
        let res = await result.json();
        this.tweets = res;
        result = await fetch(this.$store.state.base_url+'get-likes',{
            method:"GET",
            headers: {"Content-Type": "application/json"}
          });
        res = await result.json();
        res.forEach(like=>{delete like._id;delete like.date});
        this.tweets.forEach((rawTweet)=>{
          let correlatedLikeObj = res.find(like =>like.tweetId == rawTweet._id);
          let mergedObj = Object.assign(rawTweet, correlatedLikeObj);
          const {username,date,likedUsers,test,uid,_id,text} = mergedObj;
          let finalObj:TweetFull = {username,date,likesQty:likedUsers.length,text,uid,_id,comments:[],commentsQty:'see comments',likes:likedUsers}
          this.tweetsFull.push(finalObj);
        })

        result = await fetch(this.$store.state.base_url+'get-saved-tweets',{
            method:"POST",
            body:JSON.stringify({uid:localStorage.getItem('uid')}),
            headers: {"Content-Type": "application/json"}
          });
        res = await result.json();
        res?(this.savedTweets = res.savedTweets):(this.savedTweets=[])
      }
    },
    computed:{
      username(){
        return this.$store.state.usernameForTitle || 'Home';
      }
    },

    async mounted(){
      this.uid = this.$route.params.uid;
      this.fetchInfo();
    },
    watch: {
    "$route.params": {
      handler(newValue) {
        console.log('param changed');
        this.tweetsFull = [];
        this.tweets = [];
        this.savedTweets = [];
        this.uid = this.$route.params.uid;
        this.fetchInfo();
      },
     // immediate: true,
    },
  },
}
</script>

<style>

</style>