<!--
 * @Date: 2023-06-13 16:10:45
 * @LastEditTime: 2023-06-13 17:56:17
 * @FilePath: /music-client/src/components/rewrite/Rtag/Rtag.vue
 * 介绍:
-->
<script lang="ts" setup>
import { ColorTheme } from "@@/components/types";
import { filterParams } from "@@/utils/tools/object";
const props = defineProps<{
  type?: ColorTheme;
  disabled?: boolean;
  size?: "medium" | "large" | "mini";
  shape?: "square" | "circle";
  text?: StrNumber;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  closeColor?: string;
  name?: StrNumber;
  /**镂空时是否填充背景色 */
  plainFill?: boolean;
  /**是否镂空 */
  plain?: boolean;
  /**是否可关闭 */
  closable?: boolean;
  show?: boolean;
  /**内置图标，或绝对路径的图片 */
  icon?: string;
}>();
const emit = defineEmits<{
  (e: "click", v: StrNumber): void;
  (e: "close", v: StrNumber): void;
}>();
</script>
<template>
  <u-tag
    :="filterParams(props)"
    @click="(e:any) => emit('click', e)"
    @close="(e:any) => emit('close', e)"
  >
  </u-tag>
</template>
<style lang="scss" scoped></style>
