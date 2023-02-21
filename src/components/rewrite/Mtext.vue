<script lang="ts" setup>
import type { StyleValue } from "vue";
const props = withDefaults(
  defineProps<{
    type: "info" | "primary" | "error" | "warning" | "success";
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
  <u--text v-bind="props"><slot></slot></u--text>
</template>

<style lang="scss" scoped></style>
