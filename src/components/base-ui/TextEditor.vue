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
import { MdEditor } from 'md-editor-v3';
import type { ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { labelMock } from '@/mock/articleMock';
import { groupMock } from '@/mock/mainMock';
import type { ArticleData, Label } from '@/types/modules/article';
import type { GalleryData } from '@/types/modules/gallery';
import AddImage from '../Diary/AddImage.vue';
import { useThemeStore } from '@/stores/modules/theme';

const toast = useToast();
const props = withDefaults(defineProps<{
    type?: 'article' | 'gallery';
}>(), {
    type: 'article',
})

// 数据由父组件持有，通过 v-model 双向绑定；article 与 gallery 公共字段一致
const model = defineModel<ArticleData | GalleryData>({ required: true });

const themeStore = useThemeStore();

// 内容框工具栏（精简，仅保留博客常用项）
const toolbars: ToolbarNames[] = [
    'bold', 'italic', 'underline', 'strikeThrough', 'title', '-',
    'unorderedList', 'orderedList', 'task', 'quote', '-',
    'codeRow', 'code', 'table', 'link', 'image', '-',
    'mermaid', 'katex', '=', 'revoke', 'next', 'fullscreen'
];

// 图片上传：后端未就绪，先转 base64 回填；后端图床到位后仅需改这里
const onUploadImg = (files: File[], callback: (urls: string[]) => void) => {
    const urls: string[] = [];
    let done = 0;
    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            urls.push(reader.result as string);
            if (++done === files.length) callback(urls);
        };
        reader.readAsDataURL(file);
    });
};



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
    model.value!.label = selectedLabels.value.map(item => item.name);
};

const deleteLabel = (labelId: number) => {
    selectedLabels.value = selectedLabels.value.filter(item => item.id !== labelId);
    model.value!.label = selectedLabels.value.map(item => item.name);
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
                    <InputText v-model="model.title" class="text-2xl!" placeholder="请输入标题..."
                        :pt="{ 
                            root: { 
                            style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent;' 
                            } 
                        }"
                    />
                    <div class="flex items-center flex-wrap gap-4">
                        <Select v-model="model.subsetId" :options="groupList" optionLabel="name" optionValue="id" placeholder="选择分组" 
                            class=" border-0! bg-transparent! shadow-none! p-0!"  
                            :pt="{ 
                                label: { style: { padding: '0' } },
                                dropdown: { class: 'hidden!' } 
                            }"      
                        >
                            <template #value>
                                <span class="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs rounded-full py-1 px-3">
                                    <TagIcon />
                                    <span class="font-semibold">{{ groupList.find(item => item.id === model.subsetId)?.name || '选择分组' }}</span>
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
                            <div v-for="label in selectedLabels" :key="label.id" class="cursor-pointer relative group hover:scale-110 transition-transform">
                                <Badge :value="label.name" size="xlarge" severity="secondary" />
                                <Times class="absolute -top-1 -right-2 cursor-pointer text-gray-400 opacity-0 group-hover:opacity-100 hover:scale-120 transition-opacity" size="12" @click="deleteLabel(label.id)" />
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
                <AddImage v-if="props.type === 'article'" ref="addImageRef" :max="1" @updateImages="" />
            </div>
            <Textarea v-model="model.introduce" class="w-full min-h-0 text-md!" :placeholder="props.type === 'article' ? '请输入文章简介...' : '请输入相册简介...'"
                :pt="{ 
                    root: { 
                        style: 'padding: 0; border: 0; box-shadow: none; outline: none; background-color: transparent; resize: none;'
                    } 
                }"
            />
            <!-- Textarea收缩时靠的是clientHeight比盒子高度少的border高度来重算高度，因此border不能为0 -->
            <MdEditor
                v-if="props.type === 'article'"
                v-model="(model as ArticleData).content"
                :theme="themeStore.isDark ? 'dark' : 'light'"
                language="zh-CN"
                placeholder="请输入内容..."
                :toolbars="toolbars"
                preview-theme="github"
                class="flex-1 min-h-0 bg-transparent!"
                @on-upload-img="onUploadImg"
            />
           
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


// md-editor-v3 编辑区（CodeMirror）自带背景色，需穿透覆盖
:deep(.md-editor-input-wrapper),
:deep(.cm-editor) {
    background-color: transparent !important;
}
</style>