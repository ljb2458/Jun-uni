<!--
 * @Date: 2023-02-19 21:04:28
 * @LastEditTime: 2023-07-03 17:24:35
 * 介绍:图片
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";
import { Mode } from "./index";

const props = withDefaults(
  defineProps<{
    src?: string;
    mode?: Mode;
    width?: StrNumber;
    height?: StrNumber;
    shape?: "square" | "circle";
    radius?: StrNumber;
    lazyLoad?: boolean;
    loadingIcon?: string;
    errorIcon?: string;
    bgColor?: string;
    duration?: StrNumber;
  }>(),
  {
    mode: "aspectFit",
  }
);
const emit = defineEmits<{
  (e: "error", errr: any): void;
  (e: "load"): void;
}>();
</script>

<template>
  <u-image
    class="Rimage"
    @load="emit('load')"
    @error="(e:any) => emit('error', e)"
    v-bind="filterParams(props)"
  >
    <template v-slot:loading>
      <slot name="loading">
        <u-loading-icon></u-loading-icon>
      </slot>
    </template>
    <template #error>
      <slot name="error"></slot>
    </template>
  </u-image>
</template>

<style lang="scss" scoped></style>
