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
import ViewHeader from '@/components/base-ui/ViewHeader.vue';

const galleryList = ref<Galleries['list']>(galleryMock.data.list);

</script>

<template>
  <ViewHeader title="摄影图库" >
    <template #right>
      <div class="space-x-4">
        <span class="text-sm text-gray-500">图片、视频、音频大小不超过20MB</span>
        <Button size="medium" severity="primary">上传</Button>
      </div>
    </template>
    <template #content>
      <Group>
        <template #panel="{ tabId }">
          <GalleryPanel :galleryList="galleryList.filter(f => f.subsetId === tabId)" />
        </template>
      </Group>
    </template>
  </ViewHeader>
  
  
</template>

<style scoped lang="less">
</style>