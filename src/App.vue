<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMainStore } from './stores/modules/main';
import { groupMock, messageMock } from './mock/mainMock.ts';

import Toast from 'primevue/toast';
import ChatBar from './components/base-ui/ChatBar.vue';
import MenuBar from './components/base-ui/MenuBar.vue';
import NavBar from './components/base-ui/NavBar.vue';

const chatBarVisible = ref(false);

onMounted(() => {
  const mainStore = useMainStore();
  mainStore.groupList.push(...groupMock.data);
  mainStore.messageList = messageMock.data;
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-sky-50 dark:bg-gray-900">
    <NavBar class="sticky top-0 z-10" @update:visible="(visible) => chatBarVisible = visible" />
    <ChatBar v-model:visible="chatBarVisible" />
    <router-view class="flex-1 px-4 py-4" />
    <Toast />
  </div>
  
</template>

<style scoped></style>
