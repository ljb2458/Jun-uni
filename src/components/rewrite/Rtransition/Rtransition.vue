<!--
 * @Date: 2023-06-13 17:37:31
 * @LastEditTime: 2023-06-13 17:45:25
 * @FilePath: /music-client/src/components/rewrite/Rtransition/Rtransition.vue
 * 介绍:
-->
<script lang="ts" setup>
import { TimingFunction } from "./idnex";
import type { StyleValue } from "vue";
import pickBy from "lodash/pickBy";
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
    :="pickBy(props)"
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
