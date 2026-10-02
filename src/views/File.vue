<script setup lang="ts">
import { Button, InputText } from 'primevue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import PlusCircle from '@primeicons/vue/plus-circle';
import Popover from 'primevue/popover';
import Dialog from 'primevue/dialog';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { useMainStore } from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import Cog from '@primeicons/vue/cog';
import { ref, onMounted } from 'vue';




const dialogVisible = ref(false);

const mainStore = useMainStore();
const { groupList } = storeToRefs(mainStore);

const popoverRef = ref();
const groupName = ref('');

const createGroup = () => {
  if (groupName.value.trim()) {
    mainStore.createGroup(groupName.value);
    groupName.value = '';
  }
  else{

  }
  popoverRef.value.hide();
};

// 设置一个缓冲区，用于存储正在编辑的分组名称
const editingGroup = ref<Record<number, string>>({});
// 重命名分组
const renameGroup = (id: number, newName: string) => {
  if (newName.trim()) {
    mainStore.renameGroup(id, newName);
    delete editingGroup.value[id] 
  }
}

const manageGroups = () => {
  dialogVisible.value = true;
  console.log('manage groups');
};
</script>

<template>
  <div class="px-4 py-2 space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">本地文件</div>
      <div class="space-x-4">
        <span class="text-sm text-gray-500">图片、视频、音频大小不超过20MB</span>
        <Button size="medium" severity="primary">上传</Button>
      </div>
    </div>
    <!-- 分组 -->
    <Tabs 
      :value="groupList[0]?.id  ?? 0" 
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
                <Tab v-for="item in groupList" :key="item.id" :value="item.id" class="z-10">{{ item.name }}</Tab>
              </div>            
              <div class="flex justify-between items-center space-x-4 px-4 shrink-0">
                <div class="z-10 flex items-center justify-center cursor-pointer" @click="popoverRef.toggle($event)">
                  <PlusCircle class="mr-1" />
                  <span class="text-sm text-gray-500">新建</span>
                </div>
                <!-- 创建分组弹窗 -->
                <Popover ref="popoverRef">
                  <div class="max-w-72 w-full">
                      <div class="flex items-center justify-between">
                          <span class="font-semibold">创建新的分组</span>
                      </div>
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
                <div class="z-10 flex items-center justify-center cursor-pointer" @click="manageGroups">
                  <Cog class="mr-1" />
                  <span class="text-sm text-gray-500">管理分组</span>
                </div>
                <!-- 管理分组对话框 -->
                <Dialog v-model:visible="dialogVisible" modal dismissableMask header="管理你的分组" :style="{ width: '50rem' }">
                    <DataTable :value="groupList" size="large" scrollable scrollHeight="400px" tableStyle="min-width: 30rem">
                      <Column field="name" header="分组名称">
                          <template #body="{ data }">
                              <InputText 
                                :value="editingGroup[data.id] ?? data.name" 
                                class="w-full" 
                                @blur="(e) => renameGroup(data.id, (e.target as HTMLInputElement).value)"
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
                              <Button size="small" severity="danger" variant="outlined">删除</Button>
                          </template>
                      </Column>
                    </DataTable>
                    <template #footer>
                        <Button severity="secondary" variant="outlined" @click="dialogVisible = false">取消</Button>
                        <Button @click="dialogVisible = false">确定</Button>
                    </template>
                </Dialog>
              </div>
            </div>
        </TabList>
        <TabPanels>
            <TabPanel v-for="item in groupList" :key="item.id" :value="item.id">
                <h2 class="text-lg font-bold">{{ item.name }}</h2>
            </TabPanel>
        </TabPanels>
    </Tabs>
  </div>
  
</template>

<style scoped lang="less">
</style>