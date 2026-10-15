<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
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
  LineSeriesOption,
  PieSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import type { PieChartData } from '@/types/modules/overView';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const props = defineProps<{
    data: PieChartData;
    chartHeight: string;
    type: string;
}>()

const option = computed<ECOption>(() => ({
  color: ['#3398DB', '#FF4D4F', '#66C2A5', '#FF9900'],
  title: {
    text: String(props.data.reduce((sum, item) => sum + item.value, 0)),
    subtext: props.type === 'device' ? '设备总数' : '访问总数',
    top: '38%',
    left: 'center',
    textStyle: {
      fontSize: containerWidth.value * 0.08,
      fontWeight: 'bold',
      color: isDark.value ? '#e5e5e5' : '#333',
    },
    subtextStyle: {
      fontSize: containerWidth.value * 0.04,
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: '0%',
    top: 'center'
  },
  series: [
    {
      name: props.type === 'device' ? '设备监测' : '网站监测',
      type: 'pie',
      radius: ['60%', '76%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 20,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false
      },
      data: props.data
    }
  ]
}));

const chartRef = ref<HTMLDivElement>();
const containerWidth = ref(0); //实现自适应文字大小

const isDark = ref(document.documentElement.classList.contains('my-app-dark'));
let observer: MutationObserver | null = null;

let chartInstance: echarts.ECharts | null = null;

const resizeChart = () => {
    chartInstance?.resize();
}

onMounted(() => {
    containerWidth.value = chartRef.value?.clientWidth || 0;
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option.value);
    window.addEventListener('resize', resizeChart);

    observer = new MutationObserver(() => {
        isDark.value = document.documentElement.classList.contains('my-app-dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})

watch(option, (newVal) => {
    chartInstance?.setOption(option.value);
})
 
onUnmounted(() => {
    window.removeEventListener('resize', resizeChart);
    observer?.disconnect();
})
</script>

<template>
  <div ref="chartRef" class="w-full" :style="{ height: props.chartHeight }"></div>
</template>

<style scoped lang="less">
</style>