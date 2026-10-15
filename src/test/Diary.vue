<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Search from '@primeicons/vue/search';
import Button from 'primevue/button';
import Times from '@primeicons/vue/times';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

import { ref } from 'vue';

import DiaryPanel from '@/components/Diary/DiaryPanel.vue';
import type { DiaryData } from '@/types/modules/diary';
import { diaryMock } from '@/mock/diaryMock';
import DiaryEditor from '@/components/Diary/DiaryEditor.vue';


const diaryList = ref<DiaryData[]>(diaryMock.data.list || []);
const searchValue = ref('');

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    if (type === 'delete') {
      diaryMock.data.list = diaryMock.data.list.filter(diary => !manageList.includes(diary.id));    
      diaryList.value = diaryMock.data.list;
    } else if (type === 'move') {
        
    }
}
</script>

<template>
  <div class="px-4 py-2 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
    <div class="flex justify-between items-center sticky top-0 	bg-sky-50 dark:bg-gray-900 z-10" >
      <div class="text-xl font-bold">随笔随记</div>
      <div class="flex">
        <IconField>
            <InputText v-model="searchValue" class="w-64" placeholder="请输入日记标题..." />
            <InputIcon v-if="searchValue" class="cursor-pointer" @click="searchValue = ''">
                <Times />
            </InputIcon>
        </IconField>
        <Button class="ml-2" severity="contrast">
            <Search />
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
        <DiaryPanel :diaryList="diaryList" class="col-span-2 bg-white dark:bg-[#1a1a1a] p-4 rounded-lg" @manageList="manageCheckedArticles" />
        <DiaryEditor  class="rounded-lg"/>
    </div>     
  </div>
</template>

<style scoped lang="less">
</style>