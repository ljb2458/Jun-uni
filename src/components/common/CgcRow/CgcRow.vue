<!--
 * @Date: 2023-02-23 10:18:43
 * @LastEditTime: 2023-05-17 15:02:22
 * @FilePath: /wkw/src/components/common/CgridCell/CgcRow.vue
 * 介绍:
-->
<script lang="ts" setup>
import { AlignItems } from "@@/components/types";
import { BorderStyle } from "@@/components/types";
const props = withDefaults(
  defineProps<{
    borderColor?: string;
    borderStyle?: BorderStyle;
    borderWidth?: string;
    border?: boolean;
    align?: AlignItems;
  }>(),
  {
    borderStyle: "solid",
    borderColor: "var(--C-OT5)",
    borderWidth: "1rem",
    border: false,
    align: "center",
  }
);
</script>

<template>
  <view
    :class="{
      CgcRow__border: props.border,
    }"
    class="CgcRow"
    :style="{
      '--CgcRow-alignItems': props.align,
      '--CgcRow-borderColor': props.borderColor,
      '--CgcRow-borderWidth': props.borderWidth,
      '--CgcRow-borderStyle': props.borderStyle,
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CgcRow {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  --border: var(--CgcRow-borderStyle) var(--CgcRow-borderColor)
    var(--CgcRow-borderWidth);
  text-align: center;
  align-items: var(--CgcRow-alignItems);
}
.CgcRow__border {
  & + .CgcRow__border {
    border-top: var(--border);
  }
}
</style>
