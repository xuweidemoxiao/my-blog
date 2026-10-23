<template>
    <PanelCard type="diary" :rowsPerPage="4" :list="diaryList" @manageList="manageCheckedDiaries"> 
        <template #panelContent="{ toggleCheck, paginatedList, manageMode, checkedItems }">
            <div v-for="diary in paginatedList" :key="diary.id" class="flex items-center py-4 cursor-pointer hover:opacity-75 hover:scale-[1.007] transition-all border-b border-gray-200 dark:border-gray-700">
                <!-- 选中框 -->
                <div 
                    class="overflow-hidden transition-all duration-200 ease-in-out"
                    :class="manageMode ? 'w-7 opacity-100 mr-2' : 'w-0 opacity-0 mr-0'"
                >
                    <Checkbox binary 
                        :modelValue="checkedItems.has(diary.id)" 
                        @update:modelValue="(val) => toggleCheck(diary.id, val)"
                    />
                </div>
                <div class="flex-1 flex flex-col space-y-4">
                    <span class="text-lg font-bold">
                        {{ diary.title }}
                        <img :src="weatherIcon[diary.weatherId]" alt="" class="w-6 h-6 inline-block">
                    </span>
                    <span class="line-clamp-3 text-muted-color">
                        {{ diary.content }}
                    </span>
                    <div class="flex items-center justify-between">
                        <div class="flex justify-start gap-2">
                            <template v-for="i in 4" :key="i">
                                <img v-if="diary.pictures?.[i]" :src="diary.pictures?.[i]" alt="" class="w-24 h-24 object-cover rounded-md">
                            </template>
                        </div> 
                        <span class="text-muted-color self-end">{{ formatRelativeTime(diary.moment) }}</span>  
                    </div>                            
                </div>             
            </div>
        </template>
    </PanelCard>  
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';

import PanelCard from '@/components/base-ui/PanelCard.vue';
import type { Diaries } from '@/types/modules/diary';
import { formatRelativeTime } from '@/utils/time';
import { weatherIcon } from '@/global/main';


const props = defineProps<{
    diaryList: Diaries['list']
}>()

const emit = defineEmits(['manageList']);


const manageCheckedDiaries = (manageList: Number[], type: 'delete' | 'move') => {
    emit('manageList', manageList, type);
};
</script>

<style scoped>
</style>
