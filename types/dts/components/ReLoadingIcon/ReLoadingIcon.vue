<!--
 * @Date: 2023-02-19 18:44:54
 * @LastEditTime: 2023-07-03 17:25:05
 * 介绍:加载图标
-->
<script lang="ts" setup>
// import { filterObject } from "@/utils/tools/object";

import { TimingFunction } from "../ReTransition/ReTransition.vue";
const props = defineProps<{
  show?: boolean;
  color?: string;
  textColor?: string;
  vertical?: boolean;
  mode?: "circle" | "semicircle";
  size?: StrNumber;
  textSize?: StrNumber;
  text?: string;
  /**css曲线 ease-in-out */
  timingFunction?: TimingFunction;
  duration?: StrNumber;
  /**图标的暗边颜色, mode为circle 模式有效 */
  inactiveColor?: string;
}>();
</script>
<template>
  <!-- <u-loading-icon :="filterObject(props)"></u-loading-icon> -->
</template>
<style lang="scss" scoped></style>
