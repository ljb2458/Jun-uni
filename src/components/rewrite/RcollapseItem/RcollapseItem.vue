<!--
 * @Date: 2023-07-03 20:13:29
 * @LastEditTime: 2023-07-03 22:40:16
 * 介绍:
-->

<script lang="ts" setup>
import { TextAlign } from "@@/components/types";
import { filterParams } from "@@/utils/tools/object";
const props = defineProps<{
  /**面板标题 */
  title?: string;
  /**标题右侧内容 */
  value?: string;
  /**标题下方的描述信息 */
  label?: string;
  /**面板是否可以打开或收起 */
  disabled?: boolean;
  /**是否展示右侧箭头并开启点击反馈 */
  isLink?: boolean;
  /**是否开启点击反馈 */
  clickable?: boolean;
  border?: boolean;
  /**标题的对齐方式 */
  align?: TextAlign;
  /**	唯一标识符，如不设置，默认用当前collapse-item的索引值 */
  name?: StrNumber;
  /**标题左侧图片，可为绝对路径的图片或内置图标 */
  icon?: string;
  /**面板展开收起的过渡时间，单位ms */
  duration?: number;
}>();
</script>
<template>
  <u-collapse-item :="filterParams(props)"> </u-collapse-item>
</template>
<style lang="scss" scoped></style>
