<template>
    <div class="min-w-0">
        <div class="flex flex-col mx-auto py-2">
            <div class="flex items-center gap-4">
                <Avatar :image="messageData.user.avatar" shape="circle" class="size-12!" />
                <div class="flex-1 flex flex-col items-start min-w-0">
                    <span class="text-color font-semibold">{{ messageData.user.name }}</span>
                    <span class="w-full text-muted-color text-sm line-clamp-2 py-2 wrap-break-word">{{ messageData.content }}</span>
                    <span class="flex items-center gap-3 text-muted-color text-xs tabular-nums">
                        {{ messageData.moment }}
                        <Trash class="cursor-pointer transition-transform hover:scale-110" @click="handleDelete" />
                    </span>
                </div>
            </div>
        </div>
        <Divider class="my-0!" />
    </div>
    
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import type { MessageData } from '@/types/index.ts';
import { Trash } from '@primeicons/vue';

const props = defineProps<{
    messageData: MessageData,
}>();

const emit = defineEmits<{
    (e: 'delete', id: number): void;
}>();

const handleDelete = () => {
    emit('delete', props.messageData.id);
}
</script>