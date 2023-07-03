<!--
 * @Date: 2023-04-13 15:20:52
 * @LastEditTime: 2023-07-03 16:08:50
 * 介绍:
-->
<script lang="ts" setup>
import { JustifyItems } from "@@/components/types";
import { filterParams } from "@@/utils/tools/object";

const props = defineProps<{
  /**grid-row */
  row?: string;
  /**grid-column */
  col?: string;
  /**grid-row-start */
  rowStart?: number;
  /**grid-row-end */
  rowEnd?: number;
  /**grid-column-start */
  colStart?: number;
  /**grid-column-end */
  colEnd?: number;
  /**justify-self */
  justify?: JustifyItems;
  /**align-self */
  align?: JustifyItems;
  /**grid-area */
  area?: StrNumber;
  width?: string;
  height?: string;
}>();
</script>

<template>
  <view
    class="CgridItem"
    :style="
      filterParams({
        width: props.width,
        height: props.height,
        gridArea: props.area,
        alignSelf: props.align,
        justifySelf: props.justify,
        gridRow: props.row,
        gridColumn: props.col,
        gridRowEnd: props.rowEnd,
        gridRowStart: props.rowStart,
        gridColumnEnd: props.colEnd,
        gridColumnStart: props.colStart,
      })
    "
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped></style>
