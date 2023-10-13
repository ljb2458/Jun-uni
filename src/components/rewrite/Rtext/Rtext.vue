<!--
 * @Date: 2023-04-20 18:38:28
 * @LastEditTime: 2023-07-03 19:40:48
 * 介绍:集成了文本类在项目中的常用功能
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
import type { StyleValue } from "vue";
import { ColorTheme } from "@/components/types";

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
  <u-text class="Rtext" v-bind="filterObject(props)"><slot></slot></u-text>
</template>

<style lang="scss" scoped></style>
