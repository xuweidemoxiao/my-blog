<script setup lang="ts">
import TextEditor from '@/components/base-ui/TextEditor.vue';
import CreateCard from '@/components/base-ui/CreateCard.vue';

import { ref } from 'vue';
import type { ArticleData } from '@/types/modules/article';

const newArticle = ref<ArticleData>({
  id: 0,
  title: '',
  subsetId: -1,
  moment: '',
  views: 0,
  state: 0,
  comment: 0,
  like: 0,
  content: '',
  label: [],
  introduce: '',
});

</script>

<template>
  <CreateCard>
    <TextEditor v-model="newArticle" class=" py-4 flex-1 min-h-0" />
  </CreateCard>
</template>

<style scoped lang="less">
</style>