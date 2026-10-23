<script setup lang="ts">
import OverlayBadge from 'primevue/overlaybadge';
import Envelope from '@primeicons/vue/envelope';
import Moon from '@primeicons/vue/moon';
import Sun from '@primeicons/vue/sun';
import SignOut from '@primeicons/vue/sign-out';
import Book from '@primeicons/vue/book';
import { Button, Avatar } from 'primevue';
import Popover from 'primevue/popover';
import Bars from '@primeicons/vue/bars';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/modules/theme';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
const emit = defineEmits(['update:visible']);
const themeStore = useThemeStore();
const userStore = useUserStore();

const handleChatBarClick = () => {
  emit('update:visible', true);
}

const toggleDarkMode = () => {
  themeStore.toggle();
}

const handleLogout = () => {
  userStore.logout();
  popoverRefA.value?.hide();
  router.push({ name: 'login' });
}

const popoverRefA = ref();
const popoverRefM = ref();
</script>

<template>
  <div
    class="flex justify-between items-center px-8 py-3 z-99
      bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
      border-b border-gray-200 dark:border-gray-700
    "
  >
    <!-- 左侧：品牌 -->
    <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/')">
      <span class="text-lg font-bold text-gray-800 dark:text-white">my-blog</span>
    </div>

    <!-- 右侧：操作区 -->
    <div class="flex items-center gap-1">
      <!-- 私信 -->
      <div
        class="flex items-center justify-center size-9 rounded-lg cursor-pointer
          text-gray-500 dark:text-gray-400
          hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200
          transition-colors duration-200
        "
        @click="handleChatBarClick"
      >
        <OverlayBadge severity="danger">
          <Envelope :size="18" />
        </OverlayBadge>
      </div>

      <!-- 暗黑模式切换 -->
      <div
        class="flex items-center justify-center size-9 rounded-lg cursor-pointer
          text-gray-500 dark:text-gray-400
          hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200
          transition-colors duration-200
        "
        @click="toggleDarkMode"
        :title="themeStore.isDark ? '切换为浅色模式' : '切换为暗黑模式'"
      >
        <Moon v-if="themeStore.isDark" :size="18" />
        <Sun v-else :size="18" />
      </div>

      <!-- 已登录：头像 + 昵称，点击展开菜单 -->
      <div
        v-if="userStore.isLogin"
        class="flex items-center gap-2 ml-2 px-2 py-1.5 rounded-lg cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
        "
        @click="popoverRefA.toggle($event)"
      >
        <Avatar :image="userStore.userInfo?.avatar" size="medium" shape="circle" />
        <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ userStore.userInfo?.nickname }}</span>
      </div>
      <Button v-else size="medium" severity="info" class="ml-2" @click="router.push({ name: 'login' })">登录</Button>
      <!-- 用户下拉菜单 -->
      <Popover ref="popoverRefA">
        <div class="min-w-44 py-1">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div class="text-sm font-semibold text-gray-800 dark:text-white">{{ userStore.userInfo?.nickname }}</div>
            <div class="text-xs text-muted-color mt-0.5">{{ userStore.userInfo?.email }}</div>
          </div>
          <div
            class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300
              cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            "
            @click="handleLogout"
          >
            <SignOut :size="16" />
            <span>退出登录</span>
          </div>
        </div>
      </Popover>
      <Button class="xl:hidden!" @click="popoverRefM.toggle($event)" iconOnly severity="secondary">
        <Bars />
      </Button>
      <Popover ref="popoverRefM">
        <div class="min-w-44 py-1">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <div class="text-sm font-semibold text-gray-800 dark:text-white">{{ userStore.userInfo?.nickname }}</div>
            <div class="text-xs text-muted-color mt-0.5">{{ userStore.userInfo?.email }}</div>
          </div>
          <div
            class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300
              cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            "
            @click="handleLogout"
          >
            <SignOut :size="16" />
            <span>退出登录</span>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>