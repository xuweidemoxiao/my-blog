<template>
    <PanelCard type="gallery" :rowsPerPage="8" :list="galleryList" @manageList="manageCheckedArticles"> 
        <template #panelContent="{ toggleCheck, paginatedList, manageMode, checkedItems }">
            <div class="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-8 mt-4">
                <div v-for="(gallery, index) in paginatedList" :key="gallery.id" class="cursor-pointer hover:opacity-75 transition-opacity relative" @click="goDetail(gallery.id)">
                    <div class="aspect-square border border-gray-300 dark:border-gray-700 group rounded-lg overflow-hidden flex items-center justify-center" >
                        <div class="grid grid-cols-3 gap-1 h-full w-full auto-rows-fr">
                            <img :src="gallery.content?.[0]?.url"  alt="image" @click=""
                                class="col-span-3 w-full h-full object-cover row-span-2" 
                            />
                            <template v-if="gallery.content?.[1]" v-for="i in 3" :key="i">
                                <img v-if="gallery.content?.[i]" :src="gallery.content[i]?.url" alt="image"
                                    class="w-full h-full object-cover" 
                                />
                            </template>
                        </div>
                        <!-- 选择框 -->
                        <div 
                            class="absolute top-1 left-1 flex items-center"
                            :class="checkedItems.has(gallery.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                        >
                            <Checkbox binary size="large"
                                v-if="manageMode"
                                :modelValue="checkedItems.has(gallery.id)" 
                                @update:modelValue="(val) => toggleCheck(gallery.id, val)"
                                :dt="{
                                    background: 'color-mix(in srgb, {surface.0} 40%, transparent)', // color-mix(色彩空间, 颜色1 占比, 颜色2 占比)
                                    'hover.background': 'color-mix(in srgb, {surface.100} 60%, transparent)', 
                                    'border.color': '{surface.300}', // 浅边框
                                    'hover.border.color': '{surface.400}', // 边框颜色变深让选中的元素看起来变小
                                    'icon.color': '{surface.300}'
                                }"
                            />
                        </div>
                    </div>
                    <div class="text-lg text-color font-bold py-2 truncate">{{ gallery.title }}</div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center space-x-1">
                                <Eye size="16" />
                                <span class="text-xs text-muted-color">{{ gallery.views }}</span>
                            </div>   
                            <div class="flex items-center space-x-1">
                                <ThumbsUp size="16" />
                                <span class="text-xs text-muted-color">{{ gallery.like }}</span>
                            </div>   
                            <div class="flex items-center space-x-1">
                                <Comment size="16" />
                                <span class="text-xs text-muted-color">{{ gallery.comment }}</span>
                            </div>    
                        </div>
                        <span class="text-sm text-muted-color">
                            {{ formatRelativeTime(gallery.moment) }}
                        </span>           
                    </div>
                </div> 
            </div>
        </template>
    </PanelCard>  
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import Eye from '@primeicons/vue/eye';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import Comment from '@primeicons/vue/comment';

import type { Galleries } from '@/types/modules/gallery';

import PanelCard from '@/components/base-ui/PanelCard.vue';
import { formatRelativeTime } from '@/utils/time';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    galleryList: Galleries['list']
}>()

const emit = defineEmits(['manageList']);

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    emit('manageList', manageList, type);
};

const goDetail = (id: number) => {
    router.push({ name: 'galleryDetail', params: { id } });
}

</script>

<style scoped>
</style>
