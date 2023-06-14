<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-06-13 14:35:46
 * @FilePath: /music-client/src/components/rewrite/Rdivider/Rdivider.vue
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
</script>

<template>
  <u-divider class="Rdivider" v-bind="filterParams(props)"></u-divider>
</template>

<style lang="scss" scoped></style>
