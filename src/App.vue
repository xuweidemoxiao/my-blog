<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from './stores/modules/main';
import { groupMock, messageMock } from './mock/mainMock.ts';

import Toast from 'primevue/toast';
import ChatBar from './components/base-ui/ChatBar.vue';
import NavBar from './components/base-ui/NavBar.vue';

const route = useRoute();
const chatBarVisible = ref(false);

// 登录/注册页隐藏顶栏和私信栏
const isAuthPage = computed(() => route.name === 'login' || route.name === 'register');

onMounted(() => {
  const mainStore = useMainStore();
  mainStore.groupList.push(...groupMock.data);
  mainStore.messageList = messageMock.data;
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-sky-50 dark:bg-gray-900">
    <NavBar v-if="!isAuthPage" class="sticky top-0 z-10" @update:visible="(visible) => chatBarVisible = visible" />
    <ChatBar v-if="!isAuthPage" v-model:visible="chatBarVisible" />
    <router-view class="flex-1 px-8 py-4" />
    <Toast />
  </div>
  
</template>

<style scoped></style>
