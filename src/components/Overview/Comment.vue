<script setup lang="ts">
import DataCard from './DataCard.vue';
import type { Comments } from '@/types/index.ts';
import { ref, watch } from 'vue';
import CommentItem from '../base-ui/CommentItem.vue';
import ScrollArea from '../base-ui/ScrollArea.vue';

const props = defineProps<{
    commentList: Comments;
}>();

const emit = defineEmits();

const commentListData = ref(props.commentList);
const reachBottom = ref(false);

watch(reachBottom, (val) => {
  if (val) {
    emit('reachBottom');
    reachBottom.value = false;
  }
})

const handleTimeChange = (val: string) => {
  emit('change', val);
}

const handleDelete = (id: number) => {
  
  emit('delete', id);
}
</script>

<template>
  <DataCard :title="`共${commentListData.count}条评论`" type="comment" @change="handleTimeChange">
    <ScrollArea v-model:reachBottom="reachBottom" class="h-132 px-4">
      <CommentItem v-for="item in commentListData.list" :key="item.id" :commentData="item" @delete="handleDelete" />
    </ScrollArea>
  </DataCard>
</template>