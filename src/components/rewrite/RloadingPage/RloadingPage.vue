<!--
 * @Date: 2023-02-19 18:44:54
 * @LastEditTime: 2023-07-03 17:25:20
 * 介绍:加载页
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";

const props = defineProps<{
  color?: string;
  loadingMode?: "circle" | "semicircle";
  loading?: boolean;
  bgColor?: string;
  fontSize?: string;
  iconSize?: StrNumber;
  loadingColor?: string;
  loadingText?: string;
  image?: string;
}>();
</script>
<template>
  <u-loading-page :="filterObject(props)"></u-loading-page>
</template>
<style lang="scss" scoped></style>
