<script setup lang="ts">
import Plus from '@primeicons/vue/plus';
import Button from 'primevue/button';

import { ref, onMounted, watch } from 'vue';
import type { Comments, LineChartData, PieChartData } from '@/types/index.ts';
import { overviewMenu } from '@/global/main';
import { lineChartMock, menuMock, pieChartMock, commentMock } from '@/mock/overviewMock';

import LineChart from '@/components/Overview/LineChart.vue';
import PieChart from '@/components/Overview/PieChart.vue';
import CommentSection from '@/components/base-ui/CommentSection.vue';
import DataCard from '@/components/Overview/DataCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const overviewItems = ref([...overviewMenu]);
lineChartMock.data = lineChartMock.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
const lineChartData = ref<LineChartData>([...lineChartMock.data.slice(0, 7)]);
const pieDeviceData = ref<PieChartData>([...pieChartMock.data.device]);
const pieWebsiteData = ref<PieChartData>([...pieChartMock.data.website]);
commentMock.data.list = commentMock.data.list.sort((a, b) => new Date(b.moment).getTime() - new Date(a.moment).getTime());
const commentList = ref<Comments>({...commentMock.data, list: commentMock.data.list.slice(0, 10)});

const handleTimeChange = (val: string) => {
    if (val === 'week') {
        lineChartData.value = lineChartMock.data.slice(0, 7);
    }
    if (val === 'month') {
        lineChartData.value = lineChartMock.data.slice(0, 30);
    }
}

const handleAdd = (dataKey: string) => {
    if (dataKey === 'article') {
        router.push({name: 'articleCreate'});
    }
    else if (dataKey === 'gallery') {
        router.push({name: 'galleryCreate'});
    }
    else router.push({name: dataKey});
}

let commentCount = 10;
const handleReachBottom = () => {
    if (commentCount >= commentMock.data.list.length) return;
    const newItems = commentMock.data.list.slice(commentCount, commentCount + 10);
    commentList.value.list = [...commentList.value.list, ...newItems];
    commentCount += 10;
}

const handleDelete = (id: number) => {
  commentMock.data.list = commentMock.data.list.filter(item => item.id !== id);
  commentList.value.list = commentList.value.list.filter(item => item.id !== id);
  commentMock.data.count = commentMock.data.list.length;
  commentList.value.count = commentMock.data.list.length;

  // 删完后列表太短，自动从后备数据补足到 10 条
  if (commentList.value.list.length < 10 && commentList.value.list.length < commentMock.data.list.length) {
    const need = 10 - commentList.value.list.length;
    const loaded = new Set(commentList.value.list.map(item => item.id));
    // Set.has()是O(1)，Array.includes()是O(n)。数据多的时候Set快得多
    const rest = commentMock.data.list.filter(item => !loaded.has(item.id));
    commentList.value.list = [...commentList.value.list, ...rest.slice(0, need)];
  }
}

onMounted(() => {
    overviewItems.value.forEach((item) => {
        item.total = menuMock.data[item.dataKey];
    })
    
})
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-4 gap-4  ">
      <div 
        v-for="(item, index) in overviewItems" 
        :key="item.name" 
        :class="['flex justify-between items-center p-6 rounded-md first:text-white', item.color, item.darkColor]"
      >
        <div class="space-y-2">
          <div class="text-base">{{ item.name }}</div>
          <div class="text-3xl font-bold">{{ item.total }}</div>
        </div>
        <Button v-if="index !== 0" iconOnly severity="secondary" @click="handleAdd(item.dataKey)"><Plus /></Button>
      </div>
    </div>
    <!-- 高度只在这里定一次：内部图表/评论卡全部自适应，无需再传高度 -->
    <div class="grid grid-cols-2 grid-rows-2 gap-4 h-148">
      <!-- 左列第一行：线图 -->
      <DataCard title="访问量" class="min-h-0" @change="handleTimeChange">
        <LineChart :data="lineChartData" />
      </DataCard>
      <!-- 左列第二行：饼图 -->
      <DataCard title="数据监测" class="col-start-1 row-start-2 min-h-0">
        <div class="flex justify-between items-center h-full">
          <PieChart :data="pieDeviceData" :type="'device'" />
          <PieChart :data="pieWebsiteData" :type="'website'" />
        </div>
      </DataCard>
      <!-- 右列：评论，跨两行 -->
      <div class="col-start-2 row-start-1 row-span-2 min-h-0">
        <CommentSection
          show-card
          :comments="commentList.list"
          :total="commentList.count ?? 0"
          @reach-bottom="handleReachBottom"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>  
</template>

<style scoped>
</style>