<template>
    <div class="bg-white dark:bg-[#1a1a1a] rounded-lg">
        <FileUpload ref="fu" customUpload auto :multiple="true" accept="image/*" :maxFileSize="1000000" mode="advanced" 
            :pt="{ root: { class: 'border-0!' } }" @uploader="onFileSelect" @remove="onFileRemove"  
        >
            <template #header="{ files, chooseCallback, uploadCallback }">
                <div class="flex items-center gap-2">
                    <Button type="button" severity="secondary" variant="outlined" @click="chooseCallback()">
                        <Plus />
                        添加图片
                    </Button>
                </div>
            </template>
            <template #content="{ files, removeFileCallback }">
                <div v-if="files?.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div v-for="(file, i) of files" :key="file.name + file.type + file.size" class="group relative rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
                        <img :src="getURL(file)" :alt="file.name" class="w-full h-32 object-cover" />
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" class="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 cursor-pointer border-0" @click="removeFileCallback(i)">
                                <Times />
                            </button>
                        </div>
                        <div class="p-2">
                            <div class="text-xs font-medium truncate">{{ file.name }}</div>
                            <div class="text-xs text-muted-color">{{ formatSize(file.size) }}</div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl py-64 text-center">
                    <p class="text-muted-color m-0!">当前相册没有图片，请点击添加图片</p>
                </div>
            </template>
        </FileUpload>
    </div>
    
</template>

<script lang="ts" setup>
import Plus from '@primeicons/vue/plus';
import Times from '@primeicons/vue/times';
import Upload from '@primeicons/vue/upload';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { ref } from 'vue';

const emit = defineEmits(['updateImages']);
defineExpose({ clearFiles });

const selectedFiles  = ref<File[]>([]);

function onFileSelect(event: any) {
    selectedFiles.value.push(...event.files);   // 追加新文件
    emit('updateImages', [...selectedFiles.value]); // 通知父组件
}

function onFileRemove(event: any) {
    selectedFiles.value = selectedFiles.value.filter(f => f !== event.file);
    emit('updateImages', [...selectedFiles.value]);
}

function clearFiles() {
    selectedFiles.value = [];
    emit('updateImages', []);
}

function getURL(file: any): string {
    return file.objectURL;  // any 类型绕过 PrimeVue 类型缺失
}

const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};
</script>