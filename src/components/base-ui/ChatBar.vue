<template>
    <div class="flex justify-center">
        <Drawer v-model:visible="visible" position="right" class="w-md!">
            <template #container="{ closeCallback }">
                <div class="flex flex-col h-full">
                    <div class="flex items-center justify-between px-5 pt-3 shrink-0"> 
                        <span class="font-semibold text-xl text-primary">私信</span>
                        <span>
                            <Button type="button" @click="closeCallback" rounded variant="outlined" iconOnly class="h-8 w-8">
                                <Times />
                            </Button>
                        </span>
                    </div>
                    <ScrollArea class="">
                        <ul class="list-none p-3 m-0">
  
                            <li v-for="(item, index) in sortedMessageList" :key="item.id">
                                <a v-ripple class="flex items-center cursor-pointer px-3 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                                    <MessageItem :messageData="item" @delete="handleDelete" />
                                    <span class="flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full text-sm" style="min-width: 1.4rem; height: 1.4rem">2</span>
                                </a>
                            </li>                               
                        </ul>
                    </ScrollArea>
                    <div class="mt-auto">
                        <hr class="mb-3 mx-3 border-t border-0 border-surface" />
                        <a v-ripple class="m-3 flex items-center cursor-pointer p-3 gap-2 rounded-border text-surface-700 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 duration-150 transition-colors p-ripple">
                            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold text-sm">Amy Elsner</span>
                        </a>
                    </div>
                </div>
            </template>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import MessageItem from './MessageItem.vue';
import { Times } from '@primeicons/vue';
import ScrollArea from './ScrollArea.vue';
import { useMainStore } from '@/stores/modules/main.ts';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { sortedMessageList } = storeToRefs(mainStore);

let visible = defineModel<boolean>('visible', {
    default: false,
})

const handleDelete = (id: number) => {
    mainStore.deleteMessage(id);
}

</script>