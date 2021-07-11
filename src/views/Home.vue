<template>
  <main class="flex justify-evenly bg-red-400">
    <NavBar/>
    <Middle/>
    <Suggestions/>
  </main>
</template>

<script lang="ts">
import NavBar from '@/components/globals/NavBar.vue';
import Middle from '@/components/HomePage/Middle.vue';
import Suggestions from '@/components/globals/Suggestions.vue';
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {NavBar, Suggestions, Middle},
});
</script>
