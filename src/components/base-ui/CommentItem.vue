<template>
    <div class="flex flex-col mx-auto">
        <div class="flex items-start gap-3 py-2">
            <Avatar :image="commentData.user.avatar" shape="circle" class="size-9" />
            <div class="flex-1 flex flex-col items-start gap-2">
                <span class="text-muted-color text-sm">{{ commentData.user.name }}</span>
                <span class="text-color font-semibold py-1">{{ commentData.content }}</span>
                <span class="text-muted-color text-xs tabular-nums">
                    {{ commentData.moment }}
                    <span class="text-muted-color text-xs hover:underline ml-2">举报</span>
                </span>
            </div>
            <Trash size="16" class="cursor-pointer transition-transform hover:scale-110" @click="handleDelete" />
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Trash from '@primeicons/vue/trash';
import type { CommentData } from '@/types/index.ts';

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