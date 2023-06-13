<script lang="ts" setup>
import pickBy from "lodash/pickBy";

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
  <u-loading-icon :="pickBy(props)"></u-loading-icon>
</template>
<style lang="scss" scoped></style>
