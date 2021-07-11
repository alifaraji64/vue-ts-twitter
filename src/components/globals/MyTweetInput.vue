<template>
  <section class="py-1 px-4 flex border-b-2 border-gray-500">
        <div class="w-10 h-10 relative mb-4" id="avatar">
            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar"/>
            </div>
        </div>
        <div class="ml-4">
            <textarea cols="60" rows="5" class="bg-transparent text-gray-100 placeholder-gray-400  focus:outline-none" placeholder="What's happening"></textarea>
            <div id="buttons" class="flex justify-between items-center border-t-2 border-gray-500 pt-4">
                <div id="left">
                    <button class="text-purple-500 mx-2"><i class="fas fa-image"></i></button>
                    <button class="text-purple-500 mx-2"><i class="fas fa-image"></i></button>
                    <button class="text-purple-500 mx-2"><i class="fas fa-image"></i></button>
                </div>
                <div id="right" class="flex items-center">
                    <div id="length-limiter" class="h-6 w-6 rounded-full border-2 border-gray-500"></div>
                    <button class="py-1 px-2 ml-3 bg-purple-500 text-white rounded-xl">Tweet</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style>

</style>