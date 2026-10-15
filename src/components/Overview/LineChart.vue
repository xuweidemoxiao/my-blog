<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { LineChartData } from '@/types/modules/overView';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const props = defineProps<{
    data: LineChartData;
    chartHeight: string;
}>()

const option = computed<ECOption>(() => ({
  color: ['#007bff'],
  grid: {
    top: '4%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: props.data.map((item) => item.date)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.data.map((item) => item.count),
      type: 'line',
      smooth: true
    }
  ],
  tooltip: {
    show: true,
  }
}));

const chartRef = ref<HTMLDivElement>();

let chartInstance: echarts.ECharts | null = null;

const resizeChart = () => {
    chartInstance?.resize();
}

onMounted(() => {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option.value);
    window.addEventListener('resize', resizeChart);
})

watch(() => props.data, (newVal) => {
    chartInstance?.setOption(option.value);
})
 
onUnmounted(() => {
    window.removeEventListener('resize', resizeChart);
})
</script>

<template>
  <div ref="chartRef" class="w-full" :style="{ height: props.chartHeight }"></div>
</template>

<style scoped lang="less">
</style>