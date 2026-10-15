<template>
    <div class="flex flex-wrap gap-2">
        <!-- 已选图片 -->
        <div
            v-for="(item, i) in images"
            :key="i"
            class="group relative w-24 h-24 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 shrink-0"
        >
            <img :src="item.objectURL" class="w-full h-full object-cover" />
           <!-- hover 显示删除按钮 -->
            <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <button
                    type="button"
                    class="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 cursor-pointer border-0"
                    @click="removeImage(i)"
                >
                    <Times class="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
        <!-- 添加按钮 -- 和图片一样大，永远在最后，满 9 张隐藏 -->
        <FileUpload
            v-if="images.length < max"
            mode="basic"
            customUpload
            auto
            accept="image/*"
            :multiple="true"
            chooseLabel=" "
            @uploader="onFileSelect"
            class="w-24! h-24! bg-surface-200! dark:bg-surface-500! border-surface-200! border-0! cursor-pointer"       
        >
            <template #chooseicon>
                <Plus class="w-8! h-8!" />
            </template>
        </FileUpload>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Plus from '@primeicons/vue/plus';
import Times from '@primeicons/vue/times';
import FileUpload from 'primevue/fileupload';


interface ImageItem {
    file: File;
    objectURL: string;
}

defineExpose({
    clearImages,
});

const props = withDefaults(defineProps<{ max?: number }>(), { max: 9 });

const emit = defineEmits(['updateImages']);

const images = ref<ImageItem[]>([]);

function onFileSelect(event: any) {
    const newFiles = event.files;
    const remaining = props.max - images.value.length; // 剩余可添加的图片数量
    const toAdd = newFiles.slice(0, remaining); // 用户可能一次选超过9张，只添加剩余数量

    toAdd.forEach((file: File) => {
        images.value.push({
            file, // 原始 File 对象，上传时用
            objectURL: URL.createObjectURL(file), // 临时 URL，预览用
        });
    });
    emit('updateImages', images.value.map(img => img.file));
}

function removeImage(index: number) {
    const removedImage = images.value.splice(index, 1)[0]!; //获取被删除的图片
    if (removedImage) {
        URL.revokeObjectURL(removedImage.objectURL); // 释放createObjectURL占用的浏览器内存
    }
    emit('updateImages', images.value.map(img => img.file));
}

function clearImages() {
    images.value.forEach((item) => {
        URL.revokeObjectURL(item.objectURL); 
    });
    images.value = [];  
    emit('updateImages', []);
}
</script>

<style scoped>

</style>
