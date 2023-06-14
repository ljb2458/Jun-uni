<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-06-13 17:59:43
 * @FilePath: /music-client/src/components/rewrite/Rbutton/Rbutton.vue
 * 介绍:
-->
<script lang="ts" setup>
import omit from "lodash/omit";
import { filterParams } from "@@/utils/tools/object";

import { ColorTheme } from "../../types/index";
const props = defineProps<{
  text?: string;
  type?: ColorTheme;
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
const $props = computed(() => filterParams(omit(props, ["color"])));
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
