<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";

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
  <u-loading-page :="filterParams(props)"></u-loading-page>
</template>
<style lang="scss" scoped></style>
