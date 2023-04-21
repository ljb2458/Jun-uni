<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-04-21 17:43:21
 * @FilePath: /music-client/src/components/common/CpageView/CpageView.vue
 * 介绍:
-->
<script lang="ts" setup></script>

<template>
  <view class="CpageView">
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CpageView {
  padding: var(--gap-md);
}
</style>
