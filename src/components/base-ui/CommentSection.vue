<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';

import { computed, ref, watch } from 'vue';
import type { CommentData } from '@/types/index';
import CommentItem from './CommentItem.vue';
import ScrollArea from './ScrollArea.vue';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const props = withDefaults(defineProps<{
    // 评论数据（由父组件传入，受控）
    comments: CommentData[];
    // 评论总数（下拉加载场景下 list 只装了部分，需用 total 显示真实总数）
    total?: number;
    // 是否显示发表评论框（详情页 true，管理列表 false）
    showInput?: boolean;
    // 是否用卡片容器 + 滚动区（Overview 的管理列表 true，详情页 false）
    showCard?: boolean;
    // 普通模式下是否跟随页面滚动触底加载（详情页 true）
    followPageScroll?: boolean;
    // 当前用户（发表评论时使用，后端就绪后从登录态取）
    currentUser?: CommentData['user'];
}>(), {
    total: 0,
    showInput: false,
    showCard: false,
    followPageScroll: false,
    currentUser: () => ({
        id: 0,
        name: '我',
        avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
    }),
});

const emit = defineEmits<{
    (e: 'submit', content: string): void;
    (e: 'delete', id: number): void;
    (e: 'reachBottom'): void;
    (e: 'sortChange', type: 'new' | 'hot'): void;
}>();

// 排序方式：new = 最新（按时间倒序），hot = 最热（按点赞数倒序）
const sortType = ref<'new' | 'hot'>('new');
const sortOptions = [
    { label: '最新', value: 'new' },
    { label: '最热', value: 'hot' },
];

// 排序后的评论列表
const sortedComments = computed(() => {
    const list = [...props.comments];
    if (sortType.value === 'hot') {
        return list.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));
    }
    return list.sort((a, b) => new Date(b.moment).getTime() - new Date(a.moment).getTime());
});

// 滚动区 ref（showCard 模式用），切换排序时回到顶部
const scrollAreaRef = ref<{ scrollToTop: () => void }>();
watch(sortType, () => {
    scrollAreaRef.value?.scrollToTop();
});

// 发表评论输入
const commentInput = ref('');

const submitComment = () => {
    const content = commentInput.value.trim();
    if (!content) return;
    emit('submit', content);
    commentInput.value = '';
};

const deleteComment = (id: number) => {
    emit('delete', id);
};

// 触底加载：ScrollArea 触底时把 reachBottom 置 true，这里 watch 到后上报并复位
const reachBottom = ref(false);
watch(reachBottom, (val) => {
    if (val) {
        emit('reachBottom');
        reachBottom.value = false;
    }
});

// 跟随页面滚动触底（详情页）：用 useIntersectionObserver 监听列表末尾哨兵元素，
// 哨兵进入视口即触发加载，比监听 scroll + 计算 scrollTop 更可靠。
// 无条件调用（组合式函数不能放条件分支）；followPageScroll=false 时哨兵不渲染，observe 自动跳过。
const sentinelRef = ref<HTMLElement>();
useIntersectionObserver(sentinelRef, () => {
    if (props.followPageScroll) {
        emit('reachBottom');
    }
});
</script>

<template>
    <!-- 卡片容器模式（管理列表） -->
    <div v-if="showCard" class="p-8 bg-white dark:bg-[#1a1a1a] rounded-xl flex flex-col h-full min-h-0">
        <div class="flex justify-between items-center shrink-0">
            <div class="text-lg font-bold">共{{ total }}条评论</div>
            <SelectButton v-model="sortType" :options="sortOptions" optionLabel="label" optionValue="value" size="small" :allow-empty="false" />
        </div>
        <ScrollArea ref="scrollAreaRef" v-model:reachBottom="reachBottom" class="px-4 mt-4 flex-1 min-h-0">
            <CommentItem
                v-for="comment in sortedComments"
                :key="comment.id"
                :commentData="comment"
                @delete="deleteComment"
            />
        </ScrollArea>
    </div>

    <!-- 普通模式（详情页互动区） -->
    <div v-else class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">评论（共{{ total }}条）</h2>
            <SelectButton v-model="sortType" :options="sortOptions" optionLabel="label" optionValue="value" size="small" :allow-empty="false" />
        </div>

        <!-- 发表评论 -->
        <div v-if="showInput" class="flex items-start gap-3 mb-6">
            <Avatar :image="currentUser.avatar" shape="circle" class="size-9" />
            <div class="flex-1">
                <Textarea v-model="commentInput" class="w-full resize-none" auto-resize placeholder="写下你的评论..." rows="3" />
                <div class="flex justify-end mt-2">
                    <Button size="small" severity="primary" :disabled="!commentInput.trim()" @click="submitComment">
                        发表评论
                    </Button>
                </div>
            </div>
        </div>

        <!-- 评论列表 -->
        <div v-if="sortedComments.length">
            <CommentItem
                v-for="comment in sortedComments"
                :key="comment.id"
                :commentData="comment"
                @delete="deleteComment"
            />
        </div>
        <div v-else class="py-12 text-center text-muted-color text-sm">
            还没有评论，来抢沙发吧～
        </div>
        <!-- 哨兵元素：进入视口触发加载更多（始终渲染，保证 ref 存在） -->
        <div v-if="followPageScroll" ref="sentinelRef" class="h-px"></div>
    </div>
</template>

<style scoped lang="less">
</style>
