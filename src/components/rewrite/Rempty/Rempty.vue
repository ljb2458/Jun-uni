<!--
 * @Date: 2023-04-21 23:49:40
 * @LastEditTime: 2023-06-13 17:59:01
 * 介绍:
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";
const props = withDefaults(
  defineProps<{
    mode?:
      | "car"
      | "page"
      | "search"
      | "address"
      | "wifi"
      | "order"
      | "coupon"
      | "favor"
      | "permission"
      | "history"
      | "news"
      | "message"
      | "list"
      | "data";
    icon?: string;
    text?: string;
    textColor?: string;
    textSize?: string;
    iconColor?: string;
    iconSize?: string;
    width?: StrNumber;
    height?: StrNumber;
    show?: boolean;
    marginTop?: StrNumber;
  }>(),
  {
    mode: "data",
  }
);
</script>
<template>
  <u-empty v-bind="filterParams(props)"><slot></slot> </u-empty>
</template>
<style lang="less" scoped></style>
