<!--
 * @Date: 2023-07-03 20:13:29
 * @LastEditTime: 2023-07-04 10:57:59
 * 介绍:折叠面板
-->

<script lang="ts" setup>
import { TextAlign } from "@@/components/types";
// import { filterParams } from "@@/utils/tools/object";
const props = withDefaults(
  defineProps<{
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
    /**标题左侧图标 */
    icon?: string;
    rightIcon?: string | boolean;
    /**面板展开收起的过渡时间，单位ms */
    duration?: number;
  }>(),
  {
    rightIcon: true,
  }
);
// const slots = defineSlots<{
//   default?: (props: {}) => any;
//   title?: (props: {}) => any;
//   icon?: (props: {}) => any;
//   value?: (props: {}) => any;
//   "right-icon"?: (props: {}) => any;
// }>();
</script>
<template>
  <!-- <u-collapse-item :="filterParams(props)"> -->
  <slot></slot>
  <!-- <template #title> -->
  <slot name="title">
    {{ title }}
  </slot>
  <!-- </template> -->
  <!-- <template #icon> -->
  <slot name="icon">
    <Cicon v-if="icon" :name="icon" />
  </slot>
  <!-- </template> -->
  <!-- <template #value> -->
  <slot name="value">
    {{ value }}
  </slot>
  <!-- </template> -->
  <!-- <template #right-icon> -->
  <slot name="right-icon">
    <u-icon v-if="rightIcon === true" name="arrow-right"></u-icon>
    <Cicon v-else-if="rightIcon" :name="rightIcon" />
  </slot>
  <!-- </template> -->
  <!-- <template #[key]="slotProps" v-for="(item, key) in slots">
      <slot :name="key" :="slotProps"></slot>
    </template> -->
  <!-- </u-collapse-item> -->
</template>
<style lang="scss" scoped></style>
