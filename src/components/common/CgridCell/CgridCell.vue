<!--
 * @Date: 2023-02-23 10:18:43
 * @LastEditTime: 2023-06-15 17:20:48
 * @FilePath: /music-client/src/components/common/CgridCell/CgridCell.vue
 * 介绍:使用Grid绘制表格
-->
<script lang="ts" setup>
import { BorderStyle } from "@@/components/types";
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
    borderColor: "var(--C-OT5)",
    borderWidth: "1rem",
    border: true,
    separate: "all",
    separateStyle: "solid",
    separateColor: "var(--C-OT5)",
    separateWidth: "1rem",
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
  .CgcRow + .CgcRow {
    border-top: var(--separate);
  }
}
</style>
