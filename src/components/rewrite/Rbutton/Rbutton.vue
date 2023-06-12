<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-06-12 14:43:59
 * @FilePath: /music-client/src/components/rewrite/Rbutton/Rbutton.vue
 * 介绍:
-->
<script lang="ts" setup>
import omit from "lodash/omit";
const props = defineProps<{
  text?: string;
  type?: "info" | "primary" | "error" | "warning" | "success";
  /**按钮的大小 */
  size?: "normal" | "large" | "mini";
  /**按钮外观形状 */
  shape?: "square" | "circle";
  /**朴素按钮 */
  plain?: boolean;
  loading?: boolean;
  loadingText?: string;
  loadingMode?: "spinner";
  loadingSize?: StrNumber;
  iconColor?: string;
  /**按钮颜色 */
  color?: string;
  bg?: string;
  icon?: string;
  /**节流 */
  throttleTime?: string;
  minWidgth?: string;
}>();
const $props = computed(() => omit(props, ["color"]));
</script>

<template>
  <u-button
    class="Rbutton"
    v-bind="$props"
    :color="props.bg"
    :style="{ color, minWidgth }"
  >
    <slot> </slot>
  </u-button>
</template>

<style lang="scss" scoped></style>
