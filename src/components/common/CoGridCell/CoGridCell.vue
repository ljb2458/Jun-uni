<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
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
      CGridCell__border: props.border,
      'CGridCell__separate-col':
        props.separate === 'col' || props.separate === 'all',
      'CGridCell__separate-row':
        props.separate === 'row' || props.separate === 'all',
    }"
    class="CGridCell"
    :style="{
      '--CGridCell-borderColor': props.borderColor,
      '--CGridCell-borderWidth': props.borderWidth,
      '--CGridCell-borderStyle': props.borderStyle,
      '--CGridCell-separateColor': props.separateColor,
      '--CGridCell-separateWidth': props.separateWidth,
      '--CGridCell-separateStyle': props.separateStyle,
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss">
.CGridCell {
  --border: var(--CGridCell-borderStyle) var(--CGridCell-borderColor)
    var(--CGridCell-borderWidth);
  --separate: var(--CGridCell-separateStyle) var(--CGridCell-separateColor)
    var(--CGridCell-separateWidth);
}
.CGridCell__border {
  border: var(--border);
}
.CGridCell__separate-col {
  :where(.CgcCol) + :where(.CgcCol) {
    border-left: var(--separate);
  }
}
.CGridCell__separate-row {
  :where(.CgcRow) + :where(.CgcRow) {
    border-top: var(--separate);
  }
}
</style>
