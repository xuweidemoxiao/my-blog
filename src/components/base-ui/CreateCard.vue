<script setup lang="ts">
import Button from 'primevue/button';
import AngleLeft from '@primeicons/vue/angle-left';

import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <div class="px-40 flex flex-col min-h-0">
    <div class="flex justify-between items-center">
      <div class="flex items-center cursor-pointer hover:text-[#007bff]"  @click="router.back()">
        <AngleLeft class="w-6! h-6!" />
        <span class="text-xl font-bold">返回</span>
      </div>  
      <div class="space-x-2">
        <span class="text-sm text-gray-500">刚刚保存</span>
        <Button size="large" class="h-8!" severity="primary">发布</Button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
</style>