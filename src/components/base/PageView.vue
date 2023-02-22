<script lang="ts" setup>
import { uniGetSystemInfo } from "@@/hooks/rewriteUni";
const rootFontSize = ref(1);
async function resetRem() {
  const res = await uniGetSystemInfo();
  console.log(res.screenWidth);
  
  rootFontSize.value = res.screenWidth / 375;
}
resetRem();
</script>

<template>
  <page-meta :root-font-size="rootFontSize + 'px'" class="PageView">
    <slot></slot>
  </page-meta>
</template>

<style lang="scss" scoped>
.PageView {
  display: block !important;
}
</style>
