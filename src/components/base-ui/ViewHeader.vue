<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="px-4 py-2 space-y-4">
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">{{ title }}</div>
      <slot name="right"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<style scoped lang="less">
</style>