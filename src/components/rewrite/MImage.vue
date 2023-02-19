<!--
 * @Date: 2023-02-19 21:04:28
 * @LastEditTime: 2023-02-19 21:22:55
 * @FilePath: /my-vue3-project/src/components/rewrite/MImage.vue
 * 介绍:
-->
<script lang="ts" setup>
const props = defineProps<{
  src?: string;
  mode?:
    | "aspectFill"
    | "scaleToFill"
    | "aspectFit"
    | "widthFix"
    | "heightFix"
    | "top"
    | "bottom"
    | "center"
    | "center"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  width?: StrNumber;
  height?: StrNumber;
  shape?: "square" | "circle";
  radius?: StrNumber;
  lazyLoad?: boolean;
  loadingIcon?: string;
  errorIcon?: string;
  bgColor?: string;
  duration?: StrNumber;
}>();
const emit = defineEmits<{
  (e: "error", errr: any): void;
  (e: "load"): void;
}>();
</script>

<template>
  <u--image
    @load="emit('load')"
    @error="(e:any) => emit('error', e)"
    v-bind="props"
  >
    <template v-slot:loading>
      <slot name="loading"></slot>
    </template>
    <template #error>
      <slot name="error"></slot>
    </template>
  </u--image>
</template>

<style lang="less" scoped></style>
