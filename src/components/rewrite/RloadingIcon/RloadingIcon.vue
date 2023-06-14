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
  timingFunction?: TimingFunction;
  duration?: StrNumber;
  inactiveColor?: string;
}>();
</script>
<template>
  <u-loading-icon :="filterParams(props)"></u-loading-icon>
</template>
<style lang="scss" scoped></style>
