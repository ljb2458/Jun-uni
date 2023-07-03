<!--
 * @Date: 2023-06-13 17:37:31
 * @LastEditTime: 2023-07-03 16:10:28
 * 介绍:该组件用于组件的动画过渡效果
-->
<script lang="ts" setup>
import { TimingFunction } from "./idnex";
import type { StyleValue } from "vue";
import { filterParams } from "@@/utils/tools/object";
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
  <u-transition
    :="filterParams(props)"
    @beforeEnter="emit('beforeEnter')"
    @enter="emit('enter')"
    @afterEnter="emit('afterEnter')"
    @beforeLeave="emit('beforeLeave')"
    @leave="emit('leave')"
    @afterLeave="emit('afterLeave')"
  >
  </u-transition>
</template>
<style lang="scss" scoped></style>
