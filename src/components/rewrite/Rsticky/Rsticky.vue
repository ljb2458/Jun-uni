<!--
 * @Date: 2023-04-21 19:42:31
 * @LastEditTime: 2023-06-13 17:57:07
 * @FilePath: /music-client/src/components/rewrite/Rsticky/Rsticky.vue
 * 介绍:
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";

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
  <u-sticky v-bind="filterParams(props)">
    <slot></slot>
  </u-sticky>
</template>
<style lang="scss" scoped></style>
