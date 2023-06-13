<script lang="ts" setup>
import pickBy from "lodash/pickBy";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    color?: string;
    textColor?: string;
    vertical?: boolean;
    mode?: "circle" | "semicircle";
    size?: StrNumber;
    textSize?: StrNumber;
    text?: string;
    /**css曲线 ease-in-out */
    timingFunction?: string;
    duration?: StrNumber;
    /**图标的暗边颜色, mode为circle 模式有效 */
    inactiveColor?: string;
  }>(),
  {
    mode: "circle",
  }
);
</script>
<template>
  <u-loading-icon v-bind="pickBy(props)"></u-loading-icon>
</template>
<style lang="scss" scoped></style>
