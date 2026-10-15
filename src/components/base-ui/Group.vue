<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import PlusCircle from '@primeicons/vue/plus-circle';
import Cog from '@primeicons/vue/cog';

import Popover from 'primevue/popover';
import Dialog from 'primevue/dialog';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { ref, onMounted, nextTick, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useMainStore } from '@/stores/modules/main';

import type { GroupData } from '@/types/modules/main';

const mainStore = useMainStore();
const { groupList } = storeToRefs(mainStore);

const props = defineProps<{
    extraGroups?: GroupData[]
}>()

const fullGroups = computed(() => [
  ...groupList.value.slice(0, 2), 
  ...(props.extraGroups ?? []),     
  ...groupList.value.slice(2),   
]);

const tabsKey = ref(0); // 使用tabsKey来触发Tabs组件的重新渲染
const activeTab = ref(groupList.value[0]?.id ?? 0); // 记录当前选中的分组ID

const popoverRef = ref();
const groupName = ref('');
const dialogVisible = ref(false);

const editingGroup = ref<Record<number, string>>({}); // 设置一个缓冲区，用于存储正在编辑的分组名称

const createGroup = () => {
  if (groupName.value.trim()) {
    if(groupName.value.length > 6) return console.log('分组名称最多6个字符');
    if(groupList.value.some(g => g.name === groupName.value)) return console.log('分组名称已存在');
    mainStore.createGroup(groupName.value);
    groupName.value = '';
  }
  else{

  }
  popoverRef.value.hide();
};

const renameGroups = () => {
  for (const [id, newName] of Object.entries(editingGroup.value)) {
    if (newName.trim()) mainStore.renameGroup(Number(id), newName);
  }
  if(!groupList.value.some(g => g.id === activeTab.value)) activeTab.value = groupList.value[0]?.id ?? 0;
  editingGroup.value = {};
  dialogVisible.value = false;
  // nextTick：DOM更新完成后触发
  nextTick(() => tabsKey.value++);
}

const deleteGroup = (id: number) => {
  mainStore.deleteGroup(id);
}

const cancelDialog = () => {
  editingGroup.value = {};
  dialogVisible.value = false;
};

</script>

<template>
    <!-- 分组 -->
    <Tabs 
      :key="tabsKey"
      v-model:value="activeTab" 
      class="overflow-hidden rounded-md"
    >
        <!-- pt是PrimeVue的Pass Through机制，可以穿透组件封装，直接给内部 DOM 元素添加属性。 -->
        <TabList
            :pt="{
                activeBar: {
                    class: 'w-[calc(var(--px-active-bar-width)-10px)]! h-[calc(var(--px-active-bar-height)-16px)]! left-[calc(var(--px-active-bar-left)+5px)]! top-[calc(var(--px-active-bar-top)+8px)]! bg-surface-100! dark:bg-surface-800! rounded-md! transition-[left,width]! duration-200!'
                }
            }"
        >
            <div class="flex justify-between items-center w-full">
              <div>
                <Tab v-for="item in fullGroups" :key="item.id" :value="item.id" class="z-10">
                  <div class="bg-surface-100 dark:bg-surface-800 px-2 rounded-md">{{ item.name }}</div>
                </Tab>
              </div>            
              <div class="flex justify-between items-center space-x-4 px-4 shrink-0">
                <div class="z-10 flex items-center justify-center cursor-pointer text-muted-color hover:text-color" @click="popoverRef.toggle($event)">
                  <PlusCircle class="mr-1" />
                  <span class="text-sm">新建分组</span>
                </div>
                <!-- 创建分组弹窗 -->
                <Popover ref="popoverRef">
                  <div class="max-w-72 w-full">
                      <span class="font-semibold">创建新的分组</span>
                      <p class="text-sm text-muted-color mt-2 mb-0!">请为你的分组起个名字以开始使用。之后你仍然可以更改这个名称</p>
                      <InputText v-model="groupName" placeholder="请输入分组名称" class="mt-3 w-full" />
                      <div class="flex items-center justify-between mt-4">
                          <span class="text-xs text-surface-500 dark:text-surface-400">*不要超过6个字符</span>
                          <div class="flex items-center gap-2">
                              <Button type="button" severity="secondary" variant="outlined" size="small" @click="popoverRef.hide()">取消</Button>
                              <Button type="button" size="small" @click="createGroup">创建</Button>
                          </div>
                      </div>
                  </div>
                </Popover>
                <div class="z-10 flex items-center justify-center cursor-pointer text-muted-color hover:text-color" @click="dialogVisible = true;">
                  <Cog class="mr-1" />
                  <span class="text-sm">管理分组</span>
                </div>
                <!-- 管理分组对话框 -->
                <Dialog v-model:visible="dialogVisible" modal dismissableMask header="管理你的分组" :style="{ width: '50rem' }">
                    <DataTable :value="fullGroups" size="large" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                      <Column field="name" header="分组名称">
                          <template #body="{ data }">
                              <InputText 
                                :disabled="data.id === 0 || data.id === 1 || data.id < 0"
                                :value="editingGroup[data.id] ?? data.name" 
                                class="w-full" 
                                
                                @input="editingGroup[data.id] = ($event.target as HTMLInputElement).value"
                              />
                          </template>
                      </Column>
                      <Column field="count" header="关联文章">
                          <template #body="{ data }">
                              <span class="ml-6">{{ data.count }}</span>
                          </template>
                      </Column>
                      <Column field="moment" header="创建时间">
                          <template #body="{ data }">
                              <span class="text-sm text-gray-500">{{ data.moment }}</span>
                          </template>
                      </Column>
                      <Column header="操作">
                          <template #body="{ data }">
                              <Button :disabled="data.id === 0 || data.id === 1 || data.id < 0" class="" size="small" severity="danger" variant="outlined" @click="deleteGroup(data.id)">删除</Button>
                          </template>
                      </Column>
                    </DataTable>
                    <template #footer>
                        <Button severity="secondary" variant="outlined" @click="cancelDialog">取消</Button>
                        <Button @click="renameGroups">确定</Button>
                    </template>
                </Dialog>
              </div>
            </div>
        </TabList>
        <div :class="['grid gap-0.5 w-full', $slots.label ? 'grid-cols-4' : '']">
          <TabPanels class="col-span-3">
            <TabPanel v-for="item in fullGroups" :key="item.id" :value="item.id">
                <slot name="panel" :tabId="item.id" >
                </slot>
            </TabPanel>              
          </TabPanels>
          <slot name="label"></slot> 
        </div>      
    </Tabs>
</template>

<style scoped lang="less">
</style>