<!--
 * @Date: 2023-04-21 21:21:57
 * @LastEditTime: 2023-04-21 21:25:08
 * @FilePath: /music-client/src/components/common/Clist/Clist.vue
 * 介绍:
-->
<script lang="ts" setup>
onReachBottom(() => {
  console.log("CtabsFor.vue:onReachBottom");
});
</script>
<template>
  <view class="Clist">
    <slot></slot>
  </view>
</template>
<style lang="less" scoped></style>
