<template>
    <div class="flex flex-col mx-auto">
        <div class="flex items-start gap-3 py-2">
            <Avatar :image="commentData.user.avatar" shape="circle" class="size-9" />
            <div class="flex-1 flex flex-col items-start gap-2">
                <div class="flex items-center gap-2">
                    <span class="text-muted-color text-sm">{{ commentData.user.name }}</span>
                    <span v-if="commentData.article" class="text-xs text-muted-color bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 max-w-40 truncate">
                        来自《{{ commentData.article.title }}》
                    </span>
                </div>
                <span class="text-color font-semibold py-1">{{ commentData.content }}</span>
                <span class="text-muted-color text-xs tabular-nums flex items-center gap-1">
                    {{ formatRelativeTime(commentData.moment) }}
                    <span class="ml-2 text-muted-color cursor-pointer hover:text-color text-xs hover:underline">举报</span>
                    <span class="inline-flex items-center gap-1 ml-2 cursor-pointer hover:text-color">
                        <Trash size="14"  @click="handleDelete" />                      
                    </span>
                </span>
            </div>
            <div class="flex items-center gap-1"> 
                <ThumbsUp size="16" class="cursor-pointer transition-transform hover:scale-105"/>
                <span class="text-sm">{{ commentData.like }}</span>
            </div>      
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Trash from '@primeicons/vue/trash';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import type { CommentData } from '@/types/index.ts';
import { formatRelativeTime } from '@/utils/time';

const props = defineProps<{
    commentData: CommentData,
}>();

const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();

const handleDelete = () => {
    emit('delete', props.commentData.id);
}
</script>