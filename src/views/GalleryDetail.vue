<template>
    <CreateCard>
        <template #action>
            <Button size="medium" severity="primary" @click="">
                <Pencil class="" size="16" />
                编辑
            </Button>
        </template>
            <!-- 中间：标题等信息（左）+ 封面（右） -->
            <div class="flex items-start flex-col md:flex-row md:justify-between gap-8">
                <!-- 左：标题和其他信息 -->
                <div class="flex-1 min-w-0 space-y-4">
                    <!-- 覆盖原行高，多行标题不至于太松散 -->
                    <h1 class="text-3xl font-bold leading-tight wrap-break-word">{{ gallery?.title || '' }}</h1>
                    <div class="flex items-center flex-wrap gap-4 text-sm text-muted-color">
                        <span>{{ formatRelativeTime(gallery?.moment || '') }}</span>
                        <Tag :value="groupList.find((item) => item.id === gallery?.subsetId)?.name" severity="info" />
                        <div class="flex items-center gap-1">
                            <Eye size="16" />
                            <span>{{ gallery?.views || 0 }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <ThumbsUp size="16" />
                            <span>{{ gallery?.like || 0 }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <Comment size="16" />
                            <span>{{ gallery?.comment || 0 }}</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-2" v-if="gallery?.label && gallery.label.length">
                        <Badge v-for="label in gallery.label" :key="label" :value="label" size="large" severity="secondary" />
                    </div>
                    <p v-if="gallery?.introduce" class="text-md text-muted-color">{{ gallery.introduce }}</p>
                </div>

            </div>
        <div class="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-2 mt-4">
            <div v-for="(image, index) in gallery?.content ?? []" :key="image.id" >
                <div class="aspect-square cursor-pointer hover:opacity-75 transition-opacity relative group" >
                    <img :src="image.url" alt="image" class="w-full h-full object-cover rounded-lg" @click="openAt(index)"/>
                </div>
                <div class="text-sm text-gray-500 mt-1 text-center truncate">
                    {{ image.name }}
                </div>
            </div> 
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
                <GalleryItem v-for="(image, index) in gallery?.content ?? []" :key="image.id">
                    <img :src="image.url" :alt="`image-${index + 1}`" class="transition-[scale,filter] duration-300" :class="visible ? 'scale-100 blur-none' : 'scale-[0.9] blur-2xl'" />
                </GalleryItem>
            </GalleryContent>
            <GalleryFooter>
                <GalleryThumbnail>
                    <GalleryThumbnailContent class="justify-center">
                        <GalleryThumbnailItem v-for="(image, index) in gallery?.content ?? []" :key="image.id" :index="index">
                            <img draggable="false" :src="image.url" class="h-full w-full object-cover" />
                        </GalleryThumbnailItem>
                    </GalleryThumbnailContent>
                </GalleryThumbnail>
            </GalleryFooter>
        </Gallery>
    </CreateCard>
    

    
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
import Pencil from '@primeicons/vue/pencil';
import Badge from 'primevue/badge';
import Eye from '@primeicons/vue/eye';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import Comment from '@primeicons/vue/comment';


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
import Button from 'primevue/button';

import Checkbox from 'primevue/checkbox';
import Trash from '@primeicons/vue/trash';
import ArrowCircleRight from '@primeicons/vue/arrow-circle-right';
import type { Files } from '@/types/modules/file';
import CreateCard from '@/components/base-ui/CreateCard.vue';
import PanelCard from '@/components/base-ui/PanelCard.vue';
import { galleryMock } from '@/mock/galleryMock';
import { useRoute } from 'vue-router';
import { formatRelativeTime } from '@/utils/time';
import { groupMock } from '@/mock/mainMock';
import { useMainStore } from '@/stores/modules/main';
import { storeToRefs } from 'pinia';

const route = useRoute();
const mainStore = useMainStore();
const { groupList } = storeToRefs(mainStore);

const open = ref(false);
const activeIndex = ref(0);
const visible = ref(false);

// 根据路由参数 id 从 mock 数据中定位文章
const gallery = computed(() =>
    galleryMock.data.list.find((a) => a.id === Number(route.params.id))
);

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    
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
