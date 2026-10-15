<script setup lang="ts">
import OverlayBadge from 'primevue/overlaybadge';
import Envelope from '@primeicons/vue/envelope';
import Moon from '@primeicons/vue/moon';
import Sun from '@primeicons/vue/sun';
import { Button, Avatar } from 'primevue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/modules/theme';

const router = useRouter();
const emit = defineEmits(['update:visible']);
const themeStore = useThemeStore();

const handleChatBarClick = () => {
  emit('update:visible', true);
}

const toggleDarkMode = () => {
  themeStore.toggle();
}
</script>

<template>
  <div 
    class="flex justify-between items-center px-16 py-4 z-99
      bg-gray-100 dark:bg-gray-800 
      text-gray-800 
      border-b border-gray-200 dark:border-gray-700
    "
  >
    <!-- 左侧 -->
    <div class="flex items-center space-x-4 cursor-pointer" @click="router.push('/')">
      <img class="w-8 h-8" src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" alt="">
      <span class="text-lg font-bold dark:text-white">我的博客</span>
    </div>
    <!-- 右侧 -->
    <div class="flex items-center space-x-8">
      <OverlayBadge class="inline-block p-0.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" severity="danger">
        <Envelope :size="18" class="text-gray-500 hover:" @click="handleChatBarClick" />
      </OverlayBadge>
      <div @click="toggleDarkMode" class="p-0.5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" >
        <Moon v-if="themeStore.isDark" :size="18" class="text-gray-500"/>
        <Sun v-else :size="18" class="text-gray-500" />
      </div>
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="medium" shape="circle" />
      <Button size="medium" severity="info">登录</Button>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>