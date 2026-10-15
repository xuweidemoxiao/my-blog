<template>
    <PanelCard type="file" :rowsPerPage="32" :list="fileList" @manageList="manageCheckedArticles"> 
        <template #panelContent="{ toggleCheck, paginatedList, manageMode, checkedItems }">
            <div class="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-8 mt-4">
                <div v-for="(file, index) in paginatedList" :key="file.id" >
                    <div class="aspect-square cursor-pointer hover:opacity-75 transition-opacity relative group rounded-lg overflow-hidden flex items-center justify-center" >
                            <img :src="file.url" alt="image" @click=""
                                class="w-full h-full object-cover" 
                                v-if="getFileCategory(file.format) === 'image'"
                            />
                            <img v-if="getFileCategory(file.format) === 'video'" src="../../assets/svg/doc-type/video.svg" alt="video"/>
                            <img v-else-if="getFileCategory(file.format) === 'audio'" src="../../assets/svg/doc-type/audio.svg" alt="audio"/>
                            <img v-else-if="getFileCategory(file.format) === 'archive'" src="../../assets/svg/doc-type/zip.svg" alt="archive"/>
                            <img v-else-if="getFileCategory(file.format) === 'code'" src="../../assets/svg/doc-type/code.svg" alt="code"/>
                            <img v-else-if="getFileCategory(file.format) === 'text'" src="../../assets/svg/doc-type/text.svg" alt="text"/>
                            <img v-else-if="getFileCategory(file.format) === 'docx'" src="../../assets/svg/doc-type/docx.svg" alt="document"/>
                            <img v-else-if="getFileCategory(file.format) === 'xls'" src="../../assets/svg/doc-type/excel.svg" alt="xls"/>
                            <img v-else-if="getFileCategory(file.format) === 'pdf'" src="../../assets/svg/doc-type/pdf.svg" alt="pdf"/>
                            <img v-else-if="getFileCategory(file.format) === 'ppt'" src="../../assets/svg/doc-type/ppt.svg" alt="ppt"/>
                            <img v-else-if="getFileCategory(file.format) === 'other'" src="../../assets/svg/doc-type/other.svg" alt="other"/>
                        <div 
                            class="absolute top-1 left-1 flex items-center"
                            :class="checkedItems.has(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                        >
                            <Checkbox binary size="large"
                                v-if="manageMode"
                                :modelValue="checkedItems.has(file.id)" 
                                @update:modelValue="(val) => toggleCheck(file.id, val)"
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
                    <div class="text-sm text-gray-500 mt-1 text-center truncate">
                        {{ file.fileName }}
                    </div>
                </div> 
            </div>
        </template>
    </PanelCard>  
</template>

<script setup lang="ts">
import Checkbox from 'primevue/checkbox';
import type { Files } from '@/types/modules/file';
import PanelCard from '@/components/base-ui/PanelCard.vue';

const props = defineProps<{
    fileList: Files['list']
}>()

const emit = defineEmits(['manageList']);

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    emit('manageList', manageList, type);
};

type FileCategory = 'image' | 'video' | 'audio' | 'archive' | 'code' | 'text' | 'docx' | 'xls' | 'pdf' | 'ppt'

const fileCategoryMap: Record<FileCategory, string[]> = {
    image:    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'avif'],
    video:    ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'],
    audio:    ['mp3', 'wav', 'flac', 'ogg', 'aac', 'wma', 'm4a', 'opus'],
    archive:  ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'], 
    code:     ['js', 'ts', 'jsx', 'tsx', 'vue', 'py', 'java', 'html', 'css', 'scss', 'json'],
    text:     ['txt', 'md', 'csv'],
    docx:     ['docx', 'doc'],
    xls:      ['xls', 'xlsx'],
    pdf:      ['pdf'],
    ppt:      ['ppt', 'pptx'],
};

const getFileCategory = (format: string): FileCategory | 'other' => {
    const ext = format.toLowerCase();
    for (const [category, extensions] of Object.entries(fileCategoryMap)) {
        if (extensions.includes(ext)) return category as FileCategory;
    }
    return 'other';
};      

</script>

<style scoped>
</style>
