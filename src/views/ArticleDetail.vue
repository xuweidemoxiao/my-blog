<script setup lang="ts">
import Eye from '@primeicons/vue/eye';
import ThumbsUp from '@primeicons/vue/thumbs-up';
import Comment from '@primeicons/vue/comment';
import Pencil from '@primeicons/vue/pencil';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { articleMock } from '@/mock/articleMock';
import { groupMock } from '@/mock/mainMock';
import { commentMock } from '@/mock/overviewMock';
import { formatRelativeTime } from '@/utils/time';
import { useThemeStore } from '@/stores/modules/theme';
import CreateCard from '@/components/base-ui/CreateCard.vue';
import CommentSection from '@/components/base-ui/CommentSection.vue';
import type { CommentData } from '@/types/index';

const route = useRoute();
const themeStore = useThemeStore();

// 根据路由参数 id 从 mock 数据中定位文章
const article = computed(() =>
    articleMock.data.list.find((a) => a.id === Number(route.params.id))
);

// 评论数据（由父组件持有，受控传入 CommentSection；后端就绪后改为按 article.id 拉取）
// 初始只加载 10 条，触底增量加载
const commentList = ref<CommentData[]>(commentMock.data.list.slice(0, 10));
// 已加载数量
let loadedCount = 10;
// 真实评论总数（下拉加载场景下 list 只装了部分）
const commentTotal = ref(commentMock.data.count);

// 触底加载更多评论
const handleReachBottom = () => {
    if (loadedCount >= commentMock.data.list.length) return;
    const newItems = commentMock.data.list.slice(loadedCount, loadedCount + 10);
    commentList.value = [...commentList.value, ...newItems];
    loadedCount += 10;
};

// 当前登录用户（mock，后端就绪后从登录态取）
const currentUser = {
    id: 0,
    name: '我',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
};

// 发表评论（由 CommentSection 提交内容后，父组件负责追加数据）
const handleSubmit = (content: string) => {
    const newComment: CommentData = {
        id: Date.now(),
        article: { id: Number(route.params.id), title: article.value?.title || '' },
        user: currentUser,
        content,
        moment: new Date().toISOString().replace('T', ' ').slice(0, 19),
        like: 0,
        complaint: 0,
    };
    commentList.value.unshift(newComment);
    loadedCount++;
    commentTotal.value++;
};

// 删除评论
const handleDelete = (id: number) => {
    commentList.value = commentList.value.filter((c) => c.id !== id);
    loadedCount--;
    commentTotal.value--;
};

// 分组名：subsetId 为 -1 表示未分组
const groupName = computed(() => {
    if (!article.value) return '未分组';
    const g = groupMock.data.find((item) => item.id === article.value!.subsetId);
    return g?.name || '未分组';
});

const goEdit = () => {
    // TODO: 编辑入口——跳转编辑页并回填文章 id
};
</script>

<template>
    <CreateCard>
        <template #action>
            <Button v-if="article" size="medium" severity="primary" @click="goEdit">
                <Pencil class="" size="16" />
                编辑
            </Button>
        </template>

        <div class="w-full space-y-6">
            <template v-if="article">
                <!-- 中间：标题等信息（左）+ 封面（右） -->
                <div class="flex items-start flex-col md:flex-row md:justify-between gap-8">
                    <!-- 左：标题和其他信息 -->
                    <div class="flex-1 min-w-0 space-y-4">
                        <!-- 覆盖原行高，多行标题不至于太松散 -->
                        <h1 class="text-3xl font-bold leading-tight wrap-break-word">{{ article.title }}</h1>
                        <div class="flex items-center flex-wrap gap-4 text-sm text-muted-color">
                            <span>{{ formatRelativeTime(article.moment) }}</span>
                            <Tag :value="groupName" severity="info" />
                            <div class="flex items-center gap-1">
                                <Eye size="16" />
                                <span>{{ article.views }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <ThumbsUp size="16" />
                                <span>{{ article.like }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <Comment size="16" />
                                <span>{{ commentTotal }}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2" v-if="article.label && article.label.length">
                            <Badge v-for="label in article.label" :key="label" :value="label" size="large" severity="secondary" />
                        </div>

                        <p v-if="article.introduce" class="text-md text-muted-color">{{ article.introduce }}</p>
                    </div>

                    <!-- 右：封面 -->
                    <img v-if="article.cover" :src="article.cover" alt="文章封面"
                        class="w-full md:w-64 h-40 shrink-0 object-cover rounded-lg" />
                </div>

                <!-- 下面：内容 -->
                <MdPreview
                    class="bg-transparent!"
                    :modelValue="article.content || ''"
                    :theme="themeStore.isDark ? 'dark' : 'light'"
                    preview-theme="github"
                />

                <!-- 评论区 -->
                <CommentSection
                    v-if="article"
                    :comments="commentList"
                    :total="commentTotal"
                    show-input
                    follow-page-scroll
                    :current-user="currentUser"
                    @submit="handleSubmit"
                    @delete="handleDelete"
                    @reach-bottom="handleReachBottom"
                />
            </template>

            <!-- 未找到文章 -->
            <div v-else class="py-24 text-center text-muted-color">
                文章不存在或已被删除
                <div class="mt-4">
                    <span class="cursor-pointer text-[#007bff] hover:underline" @click="$router.push({ name: 'article' })">返回文章列表</span>
                </div>
            </div>
        </div>
    </CreateCard>
</template>

<style scoped lang="less">
</style>
