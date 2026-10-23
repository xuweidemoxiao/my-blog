<script setup lang="ts">
import Button from 'primevue/button';

import { ref, onMounted, nextTick, computed } from 'vue';

import FilePanel from '@/components/File/FilePanel.vue';
import { fileMock } from '@/mock/flieMock';
import type { Files } from '@/types/modules/file';

import Group from '@/components/base-ui/Group.vue';
import GalleryPanel from '@/components/Gallery/GalleryPanel.vue';

import type { Galleries } from '@/types/modules/gallery';
import { galleryMock } from '@/mock/galleryMock';
import { useRouter } from 'vue-router';

const router = useRouter();

const galleryList = ref<Galleries['list']>(galleryMock.data.list);

</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">摄影图库</div>
      <div class="space-x-4">
        <span class="text-sm text-gray-500"></span>
        <Button size="medium" severity="primary" @click="router.push({name: 'galleryCreate'})">新建</Button>
      </div>
    </div>
    <!-- 分组 -->
    <Group>
      <template #panel="{ tabId }">
        <GalleryPanel :galleryList="galleryList.filter(f => {
          if (tabId === -2) {
            return true;
          }
          return f.subsetId === tabId;
        })" />
      </template>
    </Group>
  </div>
  
</template>

<style scoped lang="less">
</style>