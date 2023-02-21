<!--
 * @Date: 2023-02-19 20:46:35
 * @LastEditTime: 2023-02-21 21:11:00
 * @FilePath: /my-vue3-project/src/components/rewrite/Mbutton.vue
 * 介绍:
-->
<script lang="ts" setup>
const props = defineProps<{
  text?: string;
  type?: "info" | "primary" | "error" | "warning" | "success";
  /**按钮的大小 */
  size?: "normal" | "large" | "mini";
  /**按钮外观形状 */
  shape?: "square" | "circle";
  plain?: boolean;
  loading?: boolean;
  loadingText?: string;
  loadingMode?: "spinner";
  loadingSize?: StrNumber;
  iconColor?: string;
  /**按钮颜色 */
  color?: string;
  icon?: string;
  /**节流 */
  throttleTime?: string;
}>();
</script>

<template>
  <u-button class="Mbutton" v-bind="props"><slot></slot></u-button>
</template>

<style lang="less" scoped></style>
