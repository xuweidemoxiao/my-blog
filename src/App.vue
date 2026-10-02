<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChatBar from './components/base-ui/ChatBar.vue';
import MenuBar from './components/base-ui/MenuBar.vue';
import NavBar from './components/base-ui/NavBar.vue';
import { useMainStore } from './stores/modules/main';
import { groupMock, messageMock } from './mock/overviewMock.ts';

const chatBarVisible = ref(false);

onMounted(() => {
  const mainStore = useMainStore();
  mainStore.groupList = groupMock.data;
  mainStore.messageList = messageMock.data;
});
</script>

<template>
  <NavBar class="sticky top-0 z-10" @update:visible="(visible) => chatBarVisible = visible" />
  <ChatBar v-model:visible="chatBarVisible" />
  <div class="px-4 py-4 flex bg-sky-50 dark:bg-gray-900">
    <MenuBar class="sticky top-21 z-10 self-start" />
    <router-view class="flex-1" />
  </div>
</template>

<style scoped></style>
