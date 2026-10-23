<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    type?: string;
    title: string;
}>(), {
    type: 'data',
})

const emit = defineEmits(['change'])

const timeValue = ref(props.type === 'comment' ? 'new' : 'week');
const options = computed(() => {
    if (props.type === 'comment') {
        return [
            { label: '最新', value: 'new' },
            { label: '最热', value: 'hot' }
        ];
    }
    return [
        { label: '近一周', value: 'week' },
        { label: '近一月', value: 'month' }
    ];
});

watch(timeValue, (val) => {
    emit('change', val)
})

</script>

<template>
  <div class="p-8 bg-white dark:bg-[#1a1a1a] rounded-xl flex flex-col min-h-0">
    <div class="flex justify-between items-center shrink-0">
      <div class="text-lg font-bold">{{ title }}</div>
      <div class="flex justify-center">
        <SelectButton v-model="timeValue" :options="options" optionLabel="label" optionValue="value" aria-labelledby="basic" :allow-empty="false" />
      </div>
    </div>
    <div class="flex-1 min-h-0 mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>