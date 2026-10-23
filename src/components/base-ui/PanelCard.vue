<template>
    <div class="min-w-0">
        <Transition name="fade" mode="out-in">
            <!-- key用来区分元素身份，避免两个div被错误识别为一个元素 -->
            <div v-if="!manageMode" key="manage-btn" class="flex items-center justify-between">
                <div class="text-sm text-muted-color hover:text-color cursor-pointer" @click="manageMode = true">
                    管理
                </div>
                <!-- 状态筛选器（进入管理模式时随管理按钮一起隐藏） -->
                <slot name="actions"></slot>
            </div>
            <div v-else key="manage-bar" class="flex justify-between items-center">
                <div class="flex items-center text-sm text-muted-color">
                    <Checkbox v-model="checkedAll" binary size="small" />
                    <span class="ml-2">全选</span>
                    <span class="ml-2">已选择 {{ checkedItems.size }} 篇文章</span>
                </div>
                <div class="flex items-center space-x-4 px-4">
                    <Trash size="16" class="cursor-pointer transition-transform hover:scale-110" @click="manageCheckedList('delete')"/>
                    <ArrowCircleRight size="16" class="cursor-pointer transition-transform hover:scale-110" @click="manageCheckedList('move')"/>
                    <span class="text-sm text-muted-color cursor-pointer" @click="manageMode = false; checkedAll = false; checkedItems.clear()">取消</span>   
                </div>
            </div>
        </Transition>
        <slot 
            name="panelContent" 
            :toggleCheck="toggleCheck" 
            :paginatedList="paginatedList"
            :manageMode="manageMode"
            :checkedItems="checkedItems"
        >
        </slot>
        <div v-if="paginatedList.length === 0" class="aspect-[3.5] flex items-center justify-center mt-4 text-gray-400">
            <span class="text-lg">这里空空如也...</span>
        </div>
        <Paginator 
            v-model:first="first" 
            v-model:rows="rows" 
            :totalRecords="list.length" 
            :rowsPerPageOptions="[rowsPerPage, rowsPerPage * 2, rowsPerPage * 3]" 
            class="mt-4"
            :dt="{
                'nav.button.width': '2.5rem',
                'nav.button.height': '2rem',
                'nav.button.font.size': '1rem',
                'nav.button.border.radius': '0.375rem',
                
            }"
            :pt="{
                prevIcon: { style: 'width: 1.375rem; height: 1.375rem' },
                nextIcon: { style: 'width: 1.375rem; height: 1.375rem' }
            }"
        />
    </div>
</template>

<!-- 泛型组件（Vue 3.3+），T类型随调用方自动推断 -->
<script setup lang="ts" generic="T extends { id: number }">
import { computed, ref } from 'vue';

import Paginator from 'primevue/paginator';
import Checkbox from 'primevue/checkbox';
import Trash from '@primeicons/vue/trash';


import ArrowCircleRight from '@primeicons/vue/arrow-circle-right';

const props = defineProps<{
    type: 'article' | 'file' | 'gallery' | 'diary'
    list: T[]
    rowsPerPage: number
}>()

const emit = defineEmits(['manageList']);

const paginatedList = computed(() => 
    props.list.slice(first.value, first.value + rows.value)
);

const first = ref(0);
const rows = ref(props.rowsPerPage);

const manageMode = ref(false);

const checkedItems = ref(new Set()); // 用Set来存已勾选的Item
const checkedAll = computed({
    get: () => props.list.every(file => checkedItems.value.has(file.id)),
    set: (val: boolean) => {
        const newSet = new Set(val ? checkedItems.value : []); // Set.add()不触发响应式，所以必须拷贝到新的Set
        props.list.forEach(file => val ? newSet.add(file.id) : newSet.delete(file.id));
        checkedItems.value = newSet; // 整体替换触发更新
    }
});  

const toggleCheck = (id: number, val: boolean) => {
    const newSet = new Set(checkedItems.value);
    val ? newSet.add(id) : newSet.delete(id);
    checkedItems.value = newSet;
};

const manageCheckedList = (type: 'delete' | 'move') => {
    const manageList: Number[] = [];
    props.list.forEach(file => {
        if (checkedItems.value.has(file.id)) {
            manageList.push(file.id);
            checkedItems.value.delete(file.id);
        }
    });
    emit('manageList', manageList, type);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
