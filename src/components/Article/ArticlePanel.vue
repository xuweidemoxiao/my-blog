<template>
    <PanelCard type="article" :rowsPerPage="5" :list="articleList" @manageList="manageCheckedArticles"> 
        <template #panelContent="{ toggleCheck, paginatedList, manageMode, checkedItems }">
            <div class="mt-4 space-y-4">
                <div v-for="article in paginatedList" :key="article.id" class="flex items-center py-4 cursor-pointer hover:opacity-75 hover:scale-[1.01] transition-all">
                    <div 
                        class="overflow-hidden transition-all duration-200 ease-in-out"
                        :class="manageMode ? 'w-7 opacity-100 mr-2' : 'w-0 opacity-0 mr-0'"
                    >
                        <Checkbox binary 
                            :modelValue="checkedItems.has(article.id)" 
                            @update:modelValue="(val) => toggleCheck(article.id, val)"
                        />
                    </div>
                    <img :src="article.cover" alt="文章封面" class="w-60 h-36 shrink-0 object-cover rounded-md" />
                    <div class="ml-4 h-36 flex-1 flex flex-col justify-between">
                        <div class="text-lg font-bold">{{ article.title }}</div>
                        <div class="text-md line-clamp-2">
                            {{ article.introduce }}
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-4">
                                <span class="text-sm text-muted-color">
                                    {{ formatRelativeTime(article.moment) }}
                                </span>
                                <div class="flex items-center space-x-2">
                                    <Badge v-for="label in article.label!.slice(0, 3)" :value="label" size="large" severity="secondary" />
                                </div>                     
                                <span v-if="article.label && article.label.length > 3" class="text-xs text-muted-color ">+{{ article.label.length - 3 }}</span>  
                                <div class="flex items-center space-x-1">
                                    <Eye size="16" />
                                    <span class="text-xs text-muted-color">{{ article.views }}</span>
                                </div>   
                                <div class="flex items-center space-x-1">
                                    <ThumbsUp size="16" />
                                    <span class="text-xs text-muted-color">{{ article.praise }}</span>
                                </div>   
                                <div class="flex items-center space-x-1">
                                    <Comment size="16" />
                                    <span class="text-xs text-muted-color">{{ article.comment }}</span>
                                </div>        
                            </div>
                            <div class="flex items-center space-x-4">
                                <Send size="20" class="cursor-pointer transition-transform hover:scale-110" />
                                <Pencil size="20" class="cursor-pointer transition-transform hover:scale-110" />
                                <Trash size="20" class="cursor-pointer transition-transform hover:scale-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </PanelCard>  
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Trash from '@primeicons/vue/trash';
import Badge from 'primevue/badge';
import Eye from '@primeicons/vue/eye';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import Comment from '@primeicons/vue/comment';
import Send from '@primeicons/vue/send';
import Pencil from '@primeicons/vue/pencil';

import type { Articles } from '@/types/modules/article';
import PanelCard from '@/components/base-ui/PanelCard.vue';
import { formatRelativeTime } from '@/utils/time';


const props = defineProps<{
    articleList: Articles['list']
}>()

const emit = defineEmits(['manageList']);

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    emit('manageList', manageList, type);
};
</script>

<style scoped>
</style>
