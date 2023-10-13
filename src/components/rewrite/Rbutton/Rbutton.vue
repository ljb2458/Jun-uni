<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-10-07 18:56:32
 * 介绍:按钮
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
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
const $props = computed(() => filterObject(props));
const emit = defineEmits<{
  (e: "click", v: MouseEvent): void;
}>();
</script>

<template>
  <u-button
    class="Rbutton"
    v-bind="$props"
    :color="props.bg"
    :style="{ color, minWidgth }"
    @click="(e:any) => emit('click', e)"
  >
    <slot>{{ props.text }}</slot>
  </u-button>
</template>

<style lang="scss" scoped>
.Rbutton {
  display: flex;
  align-items: center;
}
</style>
