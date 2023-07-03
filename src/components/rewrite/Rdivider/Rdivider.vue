<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-07-03 16:09:33
 * 介绍:
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";

const props = defineProps<{
  /**是否虚线 */
  dashed?: boolean;
  /**是否细线 */
  hairline?: boolean;
  /**是否以点替代文字，优先于text字段起作用 */
  dot?: boolean;
  textPosition?: "center" | "left" | "right";
  text?: StrNumber;
  textSize?: StrNumber;
  textColor?: StrNumber;
  lineColor?: string;
}>();
const emit = defineEmits<{
  (e: "click", v: MouseEvent): void;
}>();
</script>

<template>
  <u-divider
    @click="(e:any)=>emit('click',e)"
    class="Rdivider"
    v-bind="filterParams(props)"
  ></u-divider>
</template>

<style lang="scss" scoped></style>
