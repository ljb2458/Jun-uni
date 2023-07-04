<!--
 * @Date: 2023-07-04 11:15:42
 * @LastEditTime: 2023-07-04 11:29:03
 * 介绍:滑动单元格
-->

<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";
import { OptionsItem } from "./index";
const props = defineProps<{
  /**控制打开或者关闭 */
  show?: boolean;
  /**标识 */
  index?: StrNumber;
  /**是否禁用 */
  disabled?: boolean;
  /**是否自动关闭 */
  autoClose?: boolean;
  /**滑动距离阈值 */
  threshold?: number;
  options?: OptionsItem[];
  /**动画过渡时间，单位ms */
  duration?: StrNumber;
  /**标识 */
  name?: StrNumber;
}>();
const emit = defineEmits<{
  (e: "click", v: { name: StrNumber; index: StrNumber }): void;
}>();
</script>
<template>
  <u-swipe-action-item
    :="filterParams(props)"
    @click="(e:any)=>emit('click',e)"
  >
    <slot></slot>
  </u-swipe-action-item>
</template>
<style lang="scss" scoped></style>
