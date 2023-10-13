<!--
 * @Date: 2023-02-23 10:18:43
 * @LastEditTime: 2023-09-26 21:53:31
 * 介绍:使用Grid绘制表格
-->
<script lang="ts" setup>
import { BorderStyle } from "@/components/types";
const props = withDefaults(
  defineProps<{
    borderColor?: string;
    borderStyle?: BorderStyle;
    borderWidth?: string;
    border?: boolean;
    separate?: "col" | "row" | "all" | "none";
    separateColor?: string;
    separateStyle?: BorderStyle;
    separateWidth?: string;
  }>(),
  {
    borderStyle: "solid",
    borderColor: "var(--C-B1-O5)",
    borderWidth: "2rpx",
    border: true,
    separate: "all",
    separateStyle: "solid",
    separateColor: "var(--C-B1-O5)",
    separateWidth: "2rpx",
  }
);
</script>

<template>
  <view
    :class="{
      CgridCell__border: props.border,
      'CgridCell__separate-col':
        props.separate === 'col' || props.separate === 'all',
      'CgridCell__separate-row':
        props.separate === 'row' || props.separate === 'all',
    }"
    class="CgridCell"
    :style="{
      '--CgridCell-borderColor': props.borderColor,
      '--CgridCell-borderWidth': props.borderWidth,
      '--CgridCell-borderStyle': props.borderStyle,
      '--CgridCell-separateColor': props.separateColor,
      '--CgridCell-separateWidth': props.separateWidth,
      '--CgridCell-separateStyle': props.separateStyle,
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss">
.CgridCell {
  --border: var(--CgridCell-borderStyle) var(--CgridCell-borderColor)
    var(--CgridCell-borderWidth);
  --separate: var(--CgridCell-separateStyle) var(--CgridCell-separateColor)
    var(--CgridCell-separateWidth);
}
.CgridCell__border {
  border: var(--border);
}
.CgridCell__separate-col {
  :where(.CgcCol) + :where(.CgcCol) {
    border-left: var(--separate);
  }
}
.CgridCell__separate-row {
  :where(.CgcRow) + :where(.CgcRow) {
    border-top: var(--separate);
  }
}
</style>
