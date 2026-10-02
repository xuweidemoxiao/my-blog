<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { overviewMenu } from '@/global/overview';
import Plus from '@primeicons/vue/plus';
import { Button } from 'primevue';
import { lineChartMock, menuMock, pieChartMock, commentMock } from '@/mock/overviewMock';
import LineChart from '@/components/Overview/LineChart.vue';
import PieChart from '@/components/Overview/PieChart.vue';
import Comment from '@/components/Overview/Comment.vue';
import DataCard from '@/components/Overview/DataCard.vue';
import type { Comments, LineChartData, PieChartData } from '@/types/index.ts';


const overviewItems = ref([...overviewMenu]);
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

const handleSortChange = (val: string) => {
    if (val === 'new') {
        commentList.value.list.sort((a, b) => new Date(b.moment).getTime() - new Date(a.moment).getTime())
    }
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
  <div class="px-4 py-2">
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
        <Button v-if="index !== 0" iconOnly severity="secondary"><Plus /></Button>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 py-4">
      <div class="space-y-4">
        <DataCard title="访问量" @change="handleTimeChange">
          <LineChart :data="lineChartData" :chartHeight="'200px'" />
        </DataCard>
        <DataCard title="数据监测">
          <div class="flex justify-between items-center">
            <PieChart :data="pieDeviceData" :chartHeight="'200px'" :type="'device'" />
            <PieChart :data="pieWebsiteData" :chartHeight="'200px'" :type="'website'" />
          </div>        
        </DataCard>
      </div>
      <Comment :commentList="commentList" ref="commentRef" @reachBottom="handleReachBottom" @change="handleSortChange" @delete="handleDelete" />
    </div>
  </div>  
</template>

<style scoped>
</style>