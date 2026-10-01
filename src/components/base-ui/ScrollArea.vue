<template>
  <div
    ref="containerRef"
    class="overflow-y-auto auto-hide-scrollbar"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import useScroll from '@/hooks/useScroll.ts';

const reachBottom = defineModel<boolean>('reachBottom');

const containerRef = ref();
const { reachBottom: _bottom } = useScroll(containerRef);

watch(_bottom, (val) => {
  if (val) {
    reachBottom.value = true;
    _bottom.value = false
  }
});
</script>

<style scoped lang="less">
.auto-hide-scrollbar {
  scrollbar-width: 6px !important;
  scrollbar-color: auto !important;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }

  &:hover {
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

    &::-webkit-scrollbar-thumb {
      background: rgba(126, 128, 128, 0.2);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(128, 128, 128, 0.35);
    }
  }
}
</style>