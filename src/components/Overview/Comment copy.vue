<script setup lang="ts">
import DataCard from './DataCard.vue';
import type { Comments } from '@/types/index.ts';
import { ref, watch } from 'vue';
import useScroll from '@/hooks/useScroll.ts';
import CommentItem from '../base-ui/CommentItem.vue';

const props = defineProps<{
    commentList: Comments;
}>();

const emit = defineEmits();

const commentListData = ref(props.commentList);
const commentRef = ref();
const{ reachBottom } = useScroll(commentRef);

watch(reachBottom, (newValue) => {
  if(newValue) {
    emit('reachBottom');
    reachBottom.value = false;
  }
})

const handleTimeChange = (val: string) => {
  emit('change', val);
}

</script>

<template>
  <DataCard :title="`共${commentListData.count}条评论`" type="comment" @change="handleTimeChange">
    <!-- <ScrollArea class="h-132">
        <ScrollAreaViewport>
          <ScrollAreaContent>
            <div v-for="item in commentList.list" :key="item.id">
              <MessaeItem :messageData="item" />
            </div>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaHandle />
        </ScrollAreaScrollbar>
    </ScrollArea> -->
    <div class="h-132 px-4 overflow-y-auto auto-hide-scrollbar" ref="commentRef">
      <CommentItem v-for="item in commentListData.list" :key="item.id" :commentData="item" />
    </div>
  </DataCard>
</template>

<style scoped lang="less">
.auto-hide-scrollbar {
  scrollbar-width: 6px !important;
  scrollbar-color: auto !important;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }

  &:hover {
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.35);
    }
  }
}
</style>