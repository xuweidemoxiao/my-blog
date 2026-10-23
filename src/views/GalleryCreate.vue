<script setup lang="ts">
import TextEditor from '@/components/base-ui/TextEditor.vue';

import AddGallery from '@/components/Diary/AddGallery.vue';
import type { GalleryData } from '@/types/modules/gallery';
import { ref } from 'vue';
import CreateCard from '@/components/base-ui/CreateCard.vue';

const newGallery = ref<GalleryData>({
    id:0,
    title:'',
    subsetId:-1,
    moment:'', //时间
    introduce:'', //简介 
    views:0, //查看次数  
    comment:0, //评论数
    like:0, //点赞次数
    content:[] //内容
})
const imageFiles = ref<File[]>([]);
</script>

<template>
  <CreateCard>
    <div class="grid grid-cols-4 gap-4 mt-4 flex-1">
      <AddGallery class="col-span-3 min-h-0" @updateImages="imageFiles = $event"/>
      <TextEditor v-model="newGallery" class="min-h-0" type="gallery"/>
    </div> 
  </CreateCard>
</template>

<style scoped lang="less">
</style>