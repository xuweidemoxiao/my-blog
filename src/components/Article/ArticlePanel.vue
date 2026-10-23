<template>
    <PanelCard type="article" :rowsPerPage="5" :list="filteredList" @manageList="manageCheckedArticles"> 
        <template #actions>
            <SelectButton
                v-model="stateFilter"
                :options="stateOptions"
                optionLabel="label"
                optionValue="value"
                :allow-empty="false"
                size="small"
                class="h-5!"
                :pt="{
                    pcToggleButton: {
                        root: { class: 'text-xs! p-0! border! border-gray-200! dark:border-gray-700!' },
                        content: { class: 'py-1.5! px-1!' },
                        label: { class: 'text-xs!' },
                    },
                }"
            />
        </template>
        <template #panelContent="{ toggleCheck, paginatedList, manageMode, checkedItems }">
            <div class="mt-4 space-y-4">
                <div v-for="article in paginatedList" :key="article.id" class="flex items-center py-4 cursor-pointer hover:opacity-75 hover:scale-[1.01] transition-all" @click="goDetail(article.id)">
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
                        <div class="flex items-center gap-2">
                            <div class="text-lg font-bold">{{ article.title }}</div>
                            <Tag :value="article.state === 1 ? '已发布' : '未发布'" :severity="article.state === 1 ? 'success' : 'warn'" />
                        </div>
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
                                    <span class="text-xs text-muted-color">{{ article.like }}</span>
                                </div>   
                                <div class="flex items-center space-x-1">
                                    <Comment size="16" />
                                    <span class="text-xs text-muted-color">{{ article.comment }}</span>
                                </div>        
                            </div>
                            <div class="flex items-center space-x-4">
                                <Send size="20" class="cursor-pointer transition-transform hover:scale-110" @click.stop="toggleState(article)" />
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
import Tag from 'primevue/tag';
import SelectButton from 'primevue/selectbutton';
import Eye from '@primeicons/vue/eye';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import Comment from '@primeicons/vue/comment';
import Send from '@primeicons/vue/send';
import Pencil from '@primeicons/vue/pencil';

import type { Articles } from '@/types/modules/article';
import PanelCard from '@/components/base-ui/PanelCard.vue';
import { formatRelativeTime } from '@/utils/time';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const router = useRouter();

const props = defineProps<{
    articleList: Articles['list']
}>()

const emit = defineEmits(['manageList']);

// 发布状态筛选：all 全部 / 0 未发布 / 1 已发布
const stateFilter = ref<'all' | number>('all');
const stateOptions = [
    { label: '全部', value: 'all' },
    { label: '已发布', value: 1 },
    { label: '未发布', value: 0 },
];

// 按发布状态筛选后的列表
const filteredList = computed(() => {
    if (stateFilter.value === 'all') return props.articleList;
    return props.articleList.filter(a => a.state === stateFilter.value);
});

const goDetail = (id: number) => {
    router.push({ name: 'articleDetail', params: { id } });
};

// 切换发布状态（0 未发布 <-> 1 已发布）
const toggleState = (article: Articles['list'][0]) => {
    
    article.state = article.state === 1 ? 0 : 1;
};

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    emit('manageList', manageList, type);
};
</script>

<style scoped>
</style>
