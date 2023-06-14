<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";

import { TimingFunction } from "../Rtransition/idnex";
const props = defineProps<{
  show?: boolean;
  color?: string;
  textColor?: string;
  vertical?: boolean;
  mode?: "circle" | "semicircle";
  size?: StrNumber;
  textSize?: StrNumber;
  text?: string;
  /**css曲线 ease-in-out */
  timingFunction?: TimingFunction;
  duration?: StrNumber;
  /**图标的暗边颜色, mode为circle 模式有效 */
  inactiveColor?: string;
}>();
</script>
<template>
  <u-loading-icon :="filterParams(props)"></u-loading-icon>
</template>
<style lang="scss" scoped></style>
