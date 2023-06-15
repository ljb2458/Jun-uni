<!--
 * @Date: 2023-02-23 10:18:43
 * @LastEditTime: 2023-06-15 17:20:29
 * @FilePath: /music-client/src/components/common/CgcCol/CgcCol.vue
 * 介绍:搭配CgridCell组件使用
-->
<script lang="ts" setup>
import { BorderStyle } from "@@/components/types";
const props = withDefaults(
  defineProps<{
    borderColor?: string;
    borderStyle?: BorderStyle;
    borderWidth?: string;
    border?: boolean;
  }>(),
  {
    borderStyle: "solid",
    borderColor: "var(--C-OT5)",
    borderWidth: "1rem",
    border: false,
  }
);
</script>

<template>
  <view
    :class="{
      CgcCol__border: props.border,
    }"
    class="CgcCol"
    :style="{
      '--CgcCol-borderColor': props.borderColor,
      '--CgcCol-borderWidth': props.borderWidth,
      '--CgcCol-borderStyle': props.borderStyle,
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CgcCol {
  word-break: break-all;
  --border: var(--CgcCol-borderStyle) var(--CgcCol-borderColor)
    var(--CgcCol-borderWidth);
}
.CgcCol__border {
  & + .CgcCol__border {
    border-left: var(--border);
  }
}
</style>
