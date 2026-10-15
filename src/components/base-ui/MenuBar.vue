<script setup lang="ts">
import { menuIcon } from '@/global/main';

</script>

<template>
  <div class="flex flex-col px-4 py-2 space-y-4 text-base">
    <router-link 
      :to="item.path"
      v-for="item in menuIcon" 
      :key="item.name" 
      class="w-40 h-10 flex items-center p-4 rounded-md 
          bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
      "
    >
      <component :is="item.icon" class="mr-2" size="16" />
      {{ item.name }}
    </router-link>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #3b82f6;
  color: #fff;
}
</style>