<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Label from '@/components/Article/Label.vue';
import Search from '@primeicons/vue/search';
import Button from 'primevue/button';
import Group from '@/components/base-ui/Group.vue';
import ArticlePanel from '@/components/Article/ArticlePanel.vue';
import Times from '@primeicons/vue/times';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

import { ref } from 'vue';
import type { ArticleData } from '@/types/modules/article';
import { articleMock } from '@/mock/articleMock';
import { useRouter } from 'vue-router';

const router = useRouter();
const articleList = ref<ArticleData[]>(articleMock.data.list || []);
const searchValue = ref('');

const manageCheckedArticles = (manageList: Number[], type: 'delete' | 'move') => {
    if (type === 'delete') {
      articleMock.data.list = articleMock.data.list.filter(article => !manageList.includes(article.id));
      articleList.value = articleMock.data.list;
    } else if (type === 'move') {
        
    }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">博客文章</div>
      <div class="flex items-center gap-4">
        <IconField>
            <InputText v-model="searchValue" class="w-80" placeholder="请输入文章标题..." />
            <InputIcon v-if="searchValue" class="cursor-pointer" @click="searchValue = ''">
                <Times />
            </InputIcon>
        </IconField>
        <Button severity="contrast">
            <Search />
        </Button>
        <Button size="medium" severity="primary" @click="router.push({name: 'articleCreate'});">新建</Button>
      </div>
    </div>
    <Group>
        <template #panel="{ tabId }">
            <ArticlePanel :articleList="articleList.filter(article => {
                // -1=未分类；-2=全部；其他=真实分组：subsetId===tabId
                if (tabId === -2) return true;
                return article.subsetId === tabId;
            })" @manageList="manageCheckedArticles" />
        </template>
        <template #label>
            <Label/>
        </template>
    </Group>
  </div>
</template>

<style scoped lang="less">
</style>