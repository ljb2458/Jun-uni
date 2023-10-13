<!--
 * @Date: 2023-02-21 13:07:37
 * @LastEditTime: 2023-09-28 22:44:53
 * 介绍:
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**背景颜色 */
    bg?: string | false;
    shadowColor?: string;
    shadow?: boolean;
    minHeight?: string;
  }>(),
  {
    shadowColor: "rgba(0,0,0,0.2)",
    shadow: false,
    bg: "var(--C-B1)",
  }
);
</script>

<template>
  <view
    :style="{
      background: props.bg || 'none',
      '--SHc': props.shadowColor,
      minHeight: props.minHeight,
    }"
    class="Ccard"
    :class="{ 'shadowVar--SHc': shadow }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.Ccard {
  padding: var(--gap-md);
  border-radius: var(--R-md);
}
</style>
