<!-- css grid item 布局 搭配 CoGrid使用 -->
<script lang="ts" setup>
import { Property } from "csstype";

import { filterObject } from "@/utils/tools/object";

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
  justify?: Property.JustifyItems;
  /**align-self */
  align?: Property.JustifyItems;
  /**grid-area */
  area?: StrNumber;
  width?: string;
  height?: string;
}>();
</script>

<template>
  <view
    class="CGridItem"
    :style="
      filterObject({
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
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
