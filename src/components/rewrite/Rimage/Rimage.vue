<!--
 * @Date: 2023-02-19 21:04:28
 * @LastEditTime: 2023-06-13 19:25:43
 * @FilePath: /music-client/src/components/rewrite/Rimage/Rimage.vue
 * 介绍:
-->
<script lang="ts" setup>
import pickBy from "lodash/pickBy";
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
    v-bind="pickBy(props)"
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
