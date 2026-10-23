<script setup lang="ts">
import Button from 'primevue/button';
import AngleLeft from '@primeicons/vue/angle-left';

import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
  <div class="flex flex-col min-h-0 max-w-6xl mx-auto w-full bg-white dark:bg-[#1a1a1a]">
    <div class="flex justify-between items-center">
      <div class="flex items-center cursor-pointer hover:text-[#007bff]" @click="router.back()">
        <AngleLeft class="w-6! h-6!" />
        <span class="text-xl font-bold">返回</span>
      </div>
      <!-- 右侧操作区：默认发布，可通过 #action 插槽替换 -->
      <slot name="action">
        <div class="space-x-2">
          <span class="text-sm text-gray-500">刚刚保存</span>
          <Button size="large" class="h-8!" severity="primary">发布</Button>
        </div>
      </slot>
    </div>
    <!-- 内容区：居中限宽 -->
    <div class=" mt-4 flex-1 min-h-0 flex flex-col">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
