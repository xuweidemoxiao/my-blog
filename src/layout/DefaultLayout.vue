<script setup lang="ts">
import MenuBar from '@/components/base-ui/MenuBar.vue';
</script>

<template>
  <div class="flex">
    <MenuBar class="sticky top-21 z-10 self-start xl:block hidden" />
    <router-view class="flex-1" />
  </div>
</template>