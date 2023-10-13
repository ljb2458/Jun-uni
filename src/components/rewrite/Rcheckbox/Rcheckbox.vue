<!--
 * @Date: 2023-07-03 17:32:03
 * @LastEditTime: 2023-07-04 11:03:10
 * 介绍:复选框组件
-->
<script lang="ts" setup>
import { filterObject } from '@/utils/tools/object';

const props = defineProps<{
  name?: StrNumber;
  checked?: boolean;
  /**形状，circle-圆形，square-方形 */
  shape?: "square" | "circle";
  /**是否禁用*/
  disabled?: boolean;
  /** #42b983; 颜色选中区域的背景色。 可选值 */
  activeColor?: string;
  /** 未选中的颜色*/
  inactiveColor?: string;
  size?: string;
  labelSize?: string;
  labelColor?: string;
  label?: StrNumber;
  /**是否禁止点击文本操作 */
  labelDisabled?: boolean;
  iconColor?: string;
  iconSize?: StrNumber;
}>();
</script>
<template>
  <u-checkbox :="filterObject(props)"></u-checkbox>
</template>
<style lang="scss" scoped></style>
