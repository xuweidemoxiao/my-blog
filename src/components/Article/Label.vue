<script setup lang="ts">
import PlusCircle from '@primeicons/vue/plus-circle';
import Badge from 'primevue/badge';
import Popover from 'primevue/popover';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import { labelMock } from '@/mock/articleMock';
import Times from '@primeicons/vue/times';
import type { Label } from '@/types/modules/article';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const labelList = ref<Label[]>(labelMock.data.list || []);

const popoverRef = ref();
const labelName = ref('');
const selectedLabels = ref<Set<number>>(new Set());

const createLabel = () => {
  if (labelName.value.trim()) {
    const maxId = labelList.value.reduce((max, item) => Math.max(max, item.id), 0);
    labelList.value.push({
      id: maxId + 1,
      name: labelName.value,
    });
    labelName.value = '';
  }
  else{
    toast.add({  severity: 'warn', summary: 'Error', detail: '请输入标签名称', life: 3000 });
  }
  popoverRef.value.hide();
};

const deleteLabel = (id: number) => {
  labelList.value = labelList.value.filter((item) => item.id !== id);
  selectedLabels.value.delete(id);
};

const toggleLabel = (id: number) => {
  const newSet = new Set(selectedLabels.value);
  selectedLabels.value.has(id) ? newSet.delete(id) : newSet.add(id);
  selectedLabels.value = newSet;
};
</script>

<template>
  <div class="max-w-96 p-4 bg-white dark:bg-[#1a1a1a] rounded-br-xl space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-lg font-bold">标签</span>
      <div class="z-10 flex items-center justify-center cursor-pointer text-muted-color hover:text-color" @click="popoverRef.toggle($event)">
        <PlusCircle class="mr-1" />
        <span class="text-sm">新建</span>
      </div>
      <Popover ref="popoverRef">
        <div class="max-w-72 w-full">
            <div class="flex items-center justify-between" @click="popoverRef.toggle($event)">
                <span class="font-semibold">创建新的标签</span>
            </div>
            <p class="text-sm text-muted-color mt-2 mb-0!">请为你的标签起个名字以开始使用</p>
            <InputText v-model="labelName" placeholder="请输入标签名称" class="mt-3 w-full" />
            <div class="flex items-center justify-between mt-4">
                <span class="text-xs text-surface-500 dark:text-surface-400">*不要超过6个字符</span>
                <div class="flex items-center gap-2">
                    <Button type="button" severity="secondary" variant="outlined" size="small" @click="popoverRef.hide()">取消</Button>
                    <Button type="button" size="small" @click="createLabel">创建</Button>
                </div>
            </div>
        </div>
      </Popover>
    </div>
    <div class="flex flex-wrap space-y-4">
      <div v-for="label in labelList" :key="label.id" class="mr-3.5 cursor-pointer relative group hover:scale-110 transition-transform">
        <Badge :value="label.name" size="xlarge" :severity="selectedLabels.has(label.id) ? 'primary' : 'secondary'" @click="toggleLabel(label.id)"/>
        <Times class="absolute -top-1 -right-2 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100 hover:scale-120 transition-opacity" size="12" @click="deleteLabel(label.id)" />
      </div>
    </div>
    
  </div>
</template>

<style scoped lang="less">
</style>