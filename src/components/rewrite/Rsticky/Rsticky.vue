<!--
 * @Date: 2023-04-21 19:42:31
 * @LastEditTime: 2023-07-03 16:10:07
 * 介绍:粘性定位吸顶组件
-->
<script lang="ts" setup>
import { filterObject } from "@@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    offsetTop?: StrNumber;
    customNavHeight?: StrNumber;
    disabled?: boolean;
    bgColor?: string;
    zIndex?: StrNumber;
    index?: StrNumber;
  }>(),
  {
    zIndex: 2,
  }
);
</script>
<template>
  <u-sticky v-bind="filterObject(props)">
    <slot></slot>
  </u-sticky>
</template>
<style lang="scss" scoped></style>
