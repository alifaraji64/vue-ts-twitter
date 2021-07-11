<template>
  <section class="py-2 px-4 flex border-b-2 border-gray-500 items-center">
        <div class="w-10 h-10 relative mb-4 rounded-full" id="avatar">
            <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
            <img src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png" alt="lovely avatar" class="object-cover object-center w-full h-full visible group-hover:hidden"/>
            </div>
        </div>
        <div class="w-5/6">
            <div class="flex text-sm">
                <h2 class="text-gray-100 mx-1">john_doe</h2>
                <p class="text-gray-500 mx-1">@johndoe6465</p>
                <p class="text-gray-500">7h</p>
            </div>
            <div id="tweet-content" class=" ml-2">
                <p  class="text-sm text-gray-200 my-2 text-left">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iusto sed dolorem eaque ducimus incidunt? Quam, velit iure! Quo sunt adipisci maiores suscipit consequuntur
                </p>
            </div>
            <div id="buttons" class="flex text-gray-500">
                <div class="flex mr-5">
                    <i class="far fa-comment"></i>
                    <p class="text-xs mx-1">30</p>
                </div>
                <div class="flex mx-5">
                    <i class="far fa-heart"></i>
                    <p class="text-xs mx-1">150</p>
                </div>
                <div class="flex ml-5">
                    <i class="far fa-bookmark"></i>
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