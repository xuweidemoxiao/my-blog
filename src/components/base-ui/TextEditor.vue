<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import TagIcon from '@primeicons/vue/tag';
import Popover from 'primevue/popover';
import Badge from 'primevue/badge';
import Times from '@primeicons/vue/times';
import { useToast } from 'primevue/usetoast';

import { ref } from 'vue';
import { labelMock } from '@/mock/articleMock';
import { groupMock } from '@/mock/mainMock';
import type { ArticleData, Label } from '@/types/modules/article';
import AddImage from '../Diary/AddImage.vue';

const toast = useToast();
const props = withDefaults(defineProps<{
    type?: string;
}>(), {
    type: 'article',
})



const newArticle = ref<ArticleData>({
  id: 0,
  title: '',
  subsetId: -1,
  moment: '',
  views: 0,
  state: 0,
  comment: 0,
  praise: 0,
  content: '',
  label: [],
  introduce: '',
});
const coverFile = ref<File>();
const labelList = ref(labelMock.data.list);
const groupList = ref(groupMock.data);
const newLabel = ref('');

const popoverRef = ref();
const selectedLabels = ref<Label[]>([]);

const toggleLabel = (label: Label) => {
    // 在已选标签数组中查找该标签的索引位置，没找到返回-1
    const idx = selectedLabels.value.findIndex(item => item.id === label.id);
    if (idx !== -1) return selectedLabels.value.splice(idx, 1); // 再次点击删除
    if (selectedLabels.value.length < 5) selectedLabels.value.push(label);
    else toast.add({  severity: 'warn', summary: 'Attention', detail: '最多只能选择5个标签', life: 3000 });
    newArticle.value.label = selectedLabels.value.map(item => item.name);
};

const deleteLabel = (labelId: number) => {
    selectedLabels.value = selectedLabels.value.filter(item => item.id !== labelId);
    newArticle.value.label = selectedLabels.value.map(item => item.name);
};

const createLabel = () => {
    const name = newLabel.value.trim();
    if (!name) return; 
    if (labelList.value.some(item => item.name === name)) 
        return toast.add({ severity: 'warn', summary: 'Attention', detail: '标签已存在', life: 3000 });  // 重名提示
    const newId = Math.max(0, ...labelList.value.map(item => item.id)) + 1;
    labelList.value.push({ id: newId, name }); //与labelMock引用同一个数组，所以会同步更新
    //Todo 后端添加标签
    newLabel.value = '';                      
};


</script>

<template> 
    <div class="bg-white dark:bg-[#1a1a1a] rounded-md flex">
        <div class=" p-4 flex flex-col gap-8 flex-1 min-h-0">
            <div class="flex items-center justify-between">
                <div class="space-y-8">
                    <InputText v-model="newArticle.title" class="text-2xl!" placeholder="请输入标题..."
                        :pt="{ 
                            root: { 
                            style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent;' 
                            } 
                        }"
                    />
                    <div class="flex items-center flex-wrap gap-4">
                        <Select v-model="newArticle.subsetId" :options="groupList" optionLabel="name" optionValue="id" placeholder="选择分组" 
                            class=" border-0! bg-transparent! shadow-none! p-0!"  
                            :pt="{ 
                                label: { style: { padding: '0' } },
                                dropdown: { class: 'hidden!' } 
                            }"      
                        >
                            <template #value>
                                <span class="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs rounded-full py-1 px-3">
                                    <TagIcon />
                                    <span class="font-semibold">{{ groupList.find(item => item.id === newArticle.subsetId)?.name || '选择分组' }}</span>
                                </span>
                            </template>
                        </Select>                  
                        <span class="text-sm cursor-pointer text-muted-color hover:text-color" @click="popoverRef.toggle($event)">{{selectedLabels.length === 0 ? '插入标签' : `已选${selectedLabels.length}个标签`}}</span>
                        <Popover ref="popoverRef">
                            <div class="max-w-72 w-full space-y-4 p-2">
                                <div>标签</div>
                                <InputText v-model="newLabel" class="w-full" placeholder="请输入标签..." @keyup.enter="createLabel"/>
                                <div class="flex flex-wrap gap-2">
                                    <Badge v-for="label in labelList" :key="label.id" :value="label.name" 
                                        size="xlarge" :severity="selectedLabels.includes(label) ? 'primary' : 'secondary'" 
                                        class="cursor-pointer" @click="toggleLabel(label)"
                                    />
                                </div>
                            </div>
                        </Popover>
                        <TransitionGroup name="tag">
                            <div v-for="label in selectedLabels" :key="label.id" class="cursor-pointer relative group hover:scale-110 transition-transform" @click="deleteLabel(label.id)">
                                <Badge :value="label.name" size="xlarge" severity="secondary" />
                                <Times class="absolute -top-1 -right-2 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100 hover:scale-120 transition-opacity" size="12" @click="" />
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
                <AddImage v-if="props.type === 'article'" ref="addImageRef" :max="1" @updateImages="" />
            </div>
            <Textarea v-if="props.type === 'article'" v-model="newArticle.introduce" class="w-full min-h-0 text-md!" placeholder="请输入简介..."
                :pt="{ 
                    root: { 
                        style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent; resize: none;'
                    } 
                }"
            />
            <!-- Textarea收缩时靠的是clientHeight比盒子高度少的border高度来重算高度，因此border不能为0 -->
            <Textarea v-model="newArticle.content" autoResize class="w-full min-h-0 text-lg! p-0! bg-transparent! shadow-none! border-transparent!" placeholder="请输入内容..."/>
        </div>
    </div>
</template>

<style scoped lang="less">
.tag-enter-active,
.tag-leave-active {
    transition: all 0.3s ease;
}
.tag-enter-from,
.tag-leave-to {
    opacity: 0;
    transform: scale(0.6);
}

// 标签虽然透明但还占着位置，需要马上脱离文档流
.tag-leave-active {
    position: absolute
}
.tag-move {
    transition: transform 0.3s ease;
}
</style>