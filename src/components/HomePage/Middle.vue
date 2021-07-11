<template>
  <div class="min-h-screen bg-gray-800 w-1/2 border-2 border-gray-500 ">
    <header class="flex justify-between items-center border-b-2 border-gray-500 px-4 py-2">
        <h2 class="text-white text-xl font-semibold">Home</h2>
        <i class="fas fa-bahai text-purple-500"></i>
    </header>
    <MyTweetInput/>
    <SingleTweet/>
    <SingleTweet/>

  </div>
</template>

<script>
import MyTweetInput from '@/components/globals/MyTweetInput.vue'
import SingleTweet from '@/components/globals/SingleTweet.vue'
export default {
    components:{MyTweetInput,SingleTweet}
}
</script>

<style>

</style>