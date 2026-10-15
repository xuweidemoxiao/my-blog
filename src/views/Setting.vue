<template>
    <div >
        <div class="flex justify-between items-center">
            <div class="flex items-center text-sm text-gray-500">
                <Checkbox v-model="checkedAll" binary size="small" />
                <span class="ml-2">全选</span>
                <span class="ml-2">已选择 {{ checkedImages.size }} 个文件</span>
            </div>
            <div class="flex items-center space-x-4 px-4">
                <Trash size="16" class="cursor-pointer transition-transform hover:scale-110"/>
                <ArrowCircleRight size="16" class="cursor-pointer transition-transform hover:scale-110"/>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2 mt-4">
            <div v-for="(image, index) in paginatedImages" :key="image" >
                <div class="aspect-square cursor-pointer hover:opacity-75 transition-opacity relative group" >
                    <img :src="image" alt="image" class="w-full h-full object-cover rounded-lg" @click="openAt(index)"/>
                    <div 
                        class="absolute top-1 left-1 flex items-center"
                        :class="checkedImages.has(image) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
                    >
                        <Checkbox binary size="large"
                            :modelValue="checkedImages.has(image)" 
                            @update:modelValue="(val) => toggleCheck(image, val)"
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
                    {{ getFileName(image, index) }}
                </div>
            </div> 
        </div>
        <Paginator 
            v-model:first="first" 
            v-model:rows="rows" 
            :totalRecords="images.length" 
            :rowsPerPageOptions="[10, 20, 30]" 
            class="mt-4"
            :dt="{
                'nav.button.width': '2.5rem',
                'nav.button.height': '2rem',
                'nav.button.font.size': '1rem',
                'nav.button.border.radius': '0.375rem',
                
            }"
            :pt="{
                prevIcon: { style: 'width: 1.375rem; height: 1.375rem' },
                nextIcon: { style: 'width: 1.375rem; height: 1.375rem' }
            }"
        />
    </div>

    <Gallery v-if="open" fullscreen v-model:activeIndex="activeIndex" class="transition-opacity duration-200" :class="visible ? 'opacity-100' : 'opacity-0'" @update:fullscreen="onFullscreenChange">
        <GalleryBackdrop />
        <GalleryPrev>
            <ChevronLeft />
        </GalleryPrev>
        <GalleryNext>
            <ChevronRight />
        </GalleryNext>
        <GalleryHeader class="justify-end gap-0.5">
            <GalleryRotateLeft>
                <Replay />
            </GalleryRotateLeft>
            <GalleryRotateRight>
                <Refresh />
            </GalleryRotateRight>
            <GalleryZoomIn>
                <SearchPlus />
            </GalleryZoomIn>
            <GalleryZoomOut>
                <SearchMinus />
            </GalleryZoomOut>
            <GalleryFlipX>
                <ArrowsH />
            </GalleryFlipX>
            <GalleryFlipY>
                <ArrowsV />
            </GalleryFlipY>
            <GalleryDownload>
                <Download />
            </GalleryDownload>
            <button type="button" class="p-gallery-action" @click="close">
                <Times />
            </button>
        </GalleryHeader>
        <GalleryContent>
            <GalleryItem v-for="(image, index) in images" :key="image">
                <img :src="image" :alt="`image-${index + 1}`" class="transition-[scale,filter] duration-300" :class="visible ? 'scale-100 blur-none' : 'scale-[0.9] blur-2xl'" />
            </GalleryItem>
        </GalleryContent>
        <GalleryFooter>
            <GalleryThumbnail>
                <GalleryThumbnailContent>
                    <GalleryThumbnailItem v-for="(image, index) in images" :key="index" :index="index">
                        <img draggable="false" :src="image" class="h-full w-full object-cover" />
                    </GalleryThumbnailItem>
                </GalleryThumbnailContent>
            </GalleryThumbnail>
        </GalleryFooter>
    </Gallery>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

import ArrowsH from '@primeicons/vue/arrows-h';
import ArrowsV from '@primeicons/vue/arrows-v';
import ChevronLeft from '@primeicons/vue/chevron-left';
import ChevronRight from '@primeicons/vue/chevron-right';
import Download from '@primeicons/vue/download';
import Refresh from '@primeicons/vue/refresh';
import Replay from '@primeicons/vue/replay';
import SearchMinus from '@primeicons/vue/search-minus';
import SearchPlus from '@primeicons/vue/search-plus';
import Times from '@primeicons/vue/times';

import Gallery from 'primevue/gallery';
import GalleryBackdrop from 'primevue/gallerybackdrop';
import GalleryPrev from 'primevue/galleryprev';
import GalleryNext from 'primevue/gallerynext';
import GalleryHeader from 'primevue/galleryheader';
import GalleryRotateLeft from 'primevue/galleryrotateleft';
import GalleryRotateRight from 'primevue/galleryrotateright';
import GalleryZoomIn from 'primevue/galleryzoomin';
import GalleryZoomOut from 'primevue/galleryzoomout';
import GalleryFlipX from 'primevue/galleryflipx';
import GalleryFlipY from 'primevue/galleryflipy';
import GalleryDownload from 'primevue/gallerydownload';
import GalleryFullScreen from 'primevue/galleryfullscreen';
import GalleryContent from 'primevue/gallerycontent';
import GalleryItem from 'primevue/galleryitem';
import GalleryFooter from 'primevue/galleryfooter';
import GalleryThumbnail from 'primevue/gallerythumbnail';
import GalleryThumbnailContent from 'primevue/gallerythumbnailcontent';
import GalleryThumbnailItem from 'primevue/gallerythumbnailitem';

import Paginator from 'primevue/paginator';

import Checkbox from 'primevue/checkbox';
import Trash from '@primeicons/vue/trash';
import ArrowCircleRight from '@primeicons/vue/arrow-circle-right';
import type { Files } from '@/types/modules/file';

const first = ref(0);
const rows = ref(10);

const open = ref(false);
const activeIndex = ref(0);
const visible = ref(false);

const photos = [
    [10, 1200, 800],
    [11, 800, 1200],
    [15, 1400, 700],
    [16, 700, 1050],
    [17, 1000, 1000],
    [18, 1300, 650],
    [19, 600, 1200],
    [20, 1200, 900],
    [27, 750, 1125],
    [28, 1400, 800],
    [29, 800, 1100],
    [36, 1100, 700],
    [37, 650, 1300],
    [39, 1200, 750],
    [42, 900, 1200],
    [43, 1300, 800],
    [47, 700, 1400],
    [48, 1000, 800],
    [49, 800, 1000],
    [50, 1400, 600],
    [52, 600, 900],
    [53, 1200, 1200],
    [54, 900, 600],
    [55, 750, 1000],
    [56, 1100, 800],
    [57, 1400, 900],
    [58, 850, 1275],
    [59, 1000, 600],
    [60, 600, 1000],
    [64, 1300, 1300]
];

const images = ref(photos.map(([id, w, h]) => `https://picsum.photos/id/${id}/${w}/${h}`));

const paginatedImages = computed(() => 
    images.value.slice(first.value, first.value + rows.value)
);

const checkedImages = ref(new Set()); // 用Set来存已勾选的图片URL   
const checkedAll = computed({
    get: () => images.value.every(img => checkedImages.value.has(img)),
    set: (val) => {
        const newSet = new Set(val ? checkedImages.value : []); // Set.add()不触发响应式，所以必须拷贝到新的Set
        images.value.forEach(img => val ? newSet.add(img) : newSet.delete(img));
        checkedImages.value = newSet; // 整体替换触发更新
    }
});       

const toggleCheck = (image: string, val: boolean) => {
    const newSet = new Set(checkedImages.value);
    val ? newSet.add(image) : newSet.delete(image);
    checkedImages.value = newSet;
};

const getFileName = (url: string, index: number) => {
    const match = url.match(/id\/(\d+)\//);  // 从 URL 提取 ID         
    return match ? `image-${match[1]}.jpg` : `image-${index + 1}.jpg`;
};

const openAt = (index: number) => {
    activeIndex.value = index;
    open.value = true;
    nextTick(() => requestAnimationFrame(() => (visible.value = true)));
};

const close = () => {
    if (!open.value) return;
    visible.value = false;
    setTimeout(() => (open.value = false), 200);
};

// 监听全屏状态的变化
const onFullscreenChange = (value: boolean) => {
    if (!value) close();
};
</script>

<style scoped>


</style>
