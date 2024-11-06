<!--
 * 介绍:图片
-->
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
import uImage from "uview-plus/components/u-image/u-image.vue";
import uLoadingIcon from "uview-plus/components/u-loading-icon/u-loading-icon.vue";
import { StyleValue } from "vue";
import { filterObject } from "@/utils/tools/object";

export type Mode =
  | "aspectFill"
  | "scaleToFill"
  | "aspectFit"
  | "widthFix"
  | "heightFix"
  | "top"
  | "bottom"
  | "center"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

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
    class?: any;
    style?: StyleValue;
  }>(),
  {
    mode: "aspectFit",
  }
);
const emit = defineEmits<{
  (e: "error", errr: any): void;
  (e: "load"): void;
}>();
const $class = computed(() => [
  { uImageAutoHeight: props.mode === "widthFix" },
  props.class,
]);
</script>

<template>
  <uImage
    :style="[style]"
    :class="$class"
    class="Reimage"
    @load="emit('load')"
    @error="(e: any) => emit('error', e)"
    v-bind="filterObject(props)"
  >
    <!-- <image :style="{ width: props.width, height: props.height }" :src="props.src" :mode="props.mode" class="Reimage"> -->
    <template #loading>
      <slot name="loading">
        <uLoadingIcon></uLoadingIcon>
      </slot>
    </template>
    <template #error>
      <slot name="error"></slot>
    </template>
    <!-- </image> -->
  </uImage>
</template>

<style lang="scss" scoped></style>
