<script setup lang="ts">
import PlusCircle from '@primeicons/vue/plus-circle';
import Badge from 'primevue/badge';
import Popover from 'primevue/popover';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Times from '@primeicons/vue/times';
import Textarea from 'primevue/textarea';

import { ref } from 'vue';

import type { DiaryData } from '@/types/modules/diary';
import { weatherIcon } from '@/global/main';
import AddImage from './AddImage.vue';
import { useToast } from 'primevue';

const toast = useToast();
const popoverRef = ref();
const addImageRef = ref<InstanceType<typeof AddImage>>();

const newDiary = ref<DiaryData>({
  id: 0,
  title: '',
  moment: '',
  weatherId: 0,
  content: '',
});

const imageFiles = ref<File[]>([]);

function submitDiary() {
  if (!newDiary.value.title.trim() || !newDiary.value.content.trim()) 
    return toast.add({  severity: 'warn', summary: 'Attention', detail: '请输入标题和内容', life: 3000 });
  
  const formData = new FormData();
  formData.append('title', newDiary.value.title);
  formData.append('content', newDiary.value.content);
  formData.append('moment', new Date().toISOString());
  formData.append('weatherId', newDiary.value.weatherId.toString());
  imageFiles.value.forEach((file) => formData.append('pictures', file));

  // TODO: fetch('/api/diary', { method: 'POST', body: formData })
  console.log('提交:', newDiary.value, Object.fromEntries(formData));

  newDiary.value = {
    id: 0,
    title: '',
    moment: '',
    weatherId: 0,
    content: '',
  };
  addImageRef.value?.clearImages();
}
</script>

<template>
  <div class="p-4 bg-white dark:bg-[#1a1a1a] rounded-br-xl flex flex-col gap-4 ">
    <div class="text-lg font-bold ">新建日记</div>
    <div class="flex">
      <InputText v-model="newDiary.title" class="flex-1 text-2xl!" placeholder="请输入标题..."
        :pt="{ 
          root: { 
            style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent;' 
          } 
        }"
      />
      <img :src="weatherIcon[newDiary.weatherId]" alt="" class="w-8 h-8 cursor-pointer" @click="popoverRef.toggle($event)"/>
      <!-- 创建分组弹窗 -->
      <Popover ref="popoverRef">
        <div class="max-w-72 w-full  grid grid-cols-4 gap-4">
          <img v-for="(item, index) in weatherIcon" :key="index" :src="item" alt="" 
            class="w-8 h-8 cursor-pointer rounded p-0.5" 
            :class="{ 'bg-blue-100 dark:bg-blue-900': newDiary.weatherId === index }"
            @click="newDiary.weatherId = index"
          >
        </div>
      </Popover>
    </div>
    <Textarea v-model="newDiary.content" class="w-full flex-1 min-h-0 text-lg!" placeholder="请输入内容..."
      :pt="{ 
        root: { 
          style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent; resize: none;'
        } 
      }"
    />
    <!-- 添加图片 -->
    <AddImage ref="addImageRef" @updateImages="imageFiles = $event"/>
    <!-- 提交按钮 -->
    <Button type="submit" class="w-full" @click="submitDiary">发布</Button>
  </div>
</template>

<style scoped lang="less">

</style>