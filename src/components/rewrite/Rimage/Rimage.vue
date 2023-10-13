<!--
 * @Date: 2023-02-19 21:04:28
 * @LastEditTime: 2023-09-28 22:51:36
 * 介绍:图片
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
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
    width: "100%",
    mode: "aspectFit",
  }
);
const emit = defineEmits<{
  (e: "error", errr: any): void;
  (e: "load"): void;
}>();
</script>

<template>
  <!-- <image :style="{ width: props.width, height: props.height }" :src="props.src" :mode="props.mode" class="Rimage"> -->
  <u-image
    :style="{ width: props.width, height: props.height }"
    class="Rimage"
    @load="emit('load')"
    @error="(e:any) => emit('error', e)"
    v-bind="filterObject(props)"
  >
    <template #loading>
      <slot name="loading">
        <u-loading-icon></u-loading-icon>
      </slot>
    </template>
    <template #error>
      <slot name="error"></slot>
    </template>
  </u-image>
  <!-- </image> -->
</template>

<style lang="scss" scoped></style>
