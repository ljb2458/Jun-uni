<!--
 * @Date: 2023-09-08 13:24:39
 * @LastEditTime: 2023-09-08 20:45:40
 * 介绍:
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    heightScale?: number;
  }>(),
  {
    heightScale: 1,
  }
);
</script>
<template>
  <view class="CautoSquare">
    <view
      :style="{ paddingTop: `${props.heightScale * 100}%` }"
      class="CautoSquare_inner"
    >
      <view class="CautoSquare_content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.CautoSquare {
  width: 100%;
  .CautoSquare_inner {
    position: relative;
    height: 0;
    .CautoSquare_content {
      position: absolute;
      inset: 0;
    }
  }
}
</style>
