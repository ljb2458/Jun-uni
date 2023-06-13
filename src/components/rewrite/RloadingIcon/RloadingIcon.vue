<script lang="ts" setup>
const props = defineProps<{
  show?: boolean;
  color?: string;
  textColor?: string;
  vertical?: boolean;
  mode?: "circle" | "semicircle";
  size?: StrNumber;
  textSize?: StrNumber;
  text?: string;
  timingFunction?: string;
  duration?: StrNumber;
  inactiveColor?: string;
}>();
</script>
<template>
  <u-loading-icon :="props"></u-loading-icon>
</template>
<style lang="scss" scoped></style>
