<!--
 * @Date: 2023-04-20 18:38:28
 * @LastEditTime: 2023-06-13 17:56:48
 * @FilePath: /music-client/src/components/rewrite/Rtext/Rtext.vue
 * 介绍:
-->
<script lang="ts" setup>
import pickBy from "lodash/pickBy";
import type { StyleValue } from "vue";
import { ColorTheme } from "@@/components/types";
const props = withDefaults(
  defineProps<{
    type: ColorTheme;
    show: boolean;
    text: string;
    /**前置图标 */
    prefixIcon: string;
    /**后置图标 */
    suffixIcon: string;
    mode: "text" | "phone" | "price" | "name" | "date" | "link";
    format: "encrypt" | ((val: string) => string);
    /**点击拨打电话 */
    call: boolean;
    bold: boolean;
    block: boolean;
    lines: StrNumber;
    color: string;
    size: string;
    iconStyle: string | StyleValue;
    decoration: "underline" | "line-through";
    margin: object | number | string;
    align: "center" | "right" | "left";
    wordWrap: "normal" | "break-word" | "anywhere";
  }>(),
  {
    show: true,
  }
);
</script>

<template>
  <u-text class="Rtext" v-bind="pickBy(props)"><slot></slot></u-text>
</template>

<style lang="scss" scoped></style>
