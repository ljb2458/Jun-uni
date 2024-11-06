<!--
 * @Date: 2023-06-13 17:37:31
 * @LastEditTime: 2023-07-03 16:10:28
 * 介绍:该组件用于组件的动画过渡效果
-->
<script lang="ts" setup>
import type { StyleValue } from "vue";
// import { filterObject } from "@/utils/tools/object";

/**fade 淡入
fade-up 上滑淡入
fade-down 下滑淡入
fade-left 左滑淡入
fade-right 右滑淡入
slide-up 上滑进入
slide-down 下滑进入
slide-left 左滑进入
slide-right 右滑进入
zoom-in 缩放
zoom-out 缩放 */
export type TimingFunction =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-out";

const props = defineProps<{
  show: boolean;
  mode: "mode" | true;
  duration: StrNumber;
  timingFunction: TimingFunction;
  customStyle: StyleValue;
}>();

const emit = defineEmits<{
  (v: "beforeEnter"): void;
  (v: "enter"): void;
  (v: "afterEnter"): void;
  (v: "beforeLeave"): void;
  (v: "leave"): void;
  (v: "afterLeave"): void;
}>();
</script>
<template>
  <!-- <u-transition :="filterObject(props)" @beforeEnter="emit('beforeEnter')" @enter="emit('enter')"
    @afterEnter="emit('afterEnter')" @beforeLeave="emit('beforeLeave')" @leave="emit('leave')"
    @afterLeave="emit('afterLeave')">
  </u-transition> -->
</template>
<style lang="scss" scoped></style>
