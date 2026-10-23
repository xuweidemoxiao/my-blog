<script setup lang="ts">
import { menuIcon } from '@/global/main';

</script>

<template>
  <nav class="flex flex-col px-3 py-3 space-y-1 text-base">
    <router-link
      :to="item.path"
      v-for="item in menuIcon"
      :key="item.name"
      class="group w-44 h-10 flex items-center px-4 rounded-lg
          text-gray-600 dark:text-gray-400
          hover:bg-gray-100 dark:hover:bg-gray-800
          transition-colors duration-200
      "
      active-class="!bg-[#3b82f6] !text-white dark:!bg-blue-600"
    >
      <component :is="item.icon" class="mr-3 shrink-0" size="18" />
      <span>{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<style scoped>
</style>
