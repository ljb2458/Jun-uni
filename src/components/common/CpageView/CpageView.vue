<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-06-14 16:59:59
 * @FilePath: /music-client/src/components/common/CpageView/CpageView.vue
 * 介绍:
-->
<script lang="ts" setup>
import notify from "@@/layout/notify.vue";
</script>

<template>
  <view class="CpageView">
    <notify>
      <slot name="notify"></slot>
    </notify>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CpageView {
  padding: var(--gap-md);
}
</style>
