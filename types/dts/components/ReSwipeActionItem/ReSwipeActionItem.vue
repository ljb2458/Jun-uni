<!--
 * @Date: 2023-07-04 11:15:42
 * @LastEditTime: 2023-07-04 11:58:41
 * 介绍:滑动单元格
-->

<script lang="ts" setup>
// import { filterObject } from "@/utils/tools/object";
import type { StyleValue } from "vue";
export interface RswipeActionOptionsItem {
  text: string;
  style?: StyleValue;
}
export interface RswipeActionClickEvent {
  name: StrNumber;
  index: StrNumber;
}

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
  options?: RswipeActionOptionsItem[];
  /**动画过渡时间，单位ms */
  duration?: StrNumber;
  /**标识 */
  name?: StrNumber;
}>();
const emit = defineEmits<{
  (e: "click", v: RswipeActionClickEvent): void;
}>();
</script>
<template>
  <!-- <u-swipe-action-item
    :="filterObject(props)"
    @click="(e:any)=>emit('click',e)"
  >
    <slot></slot>
  </u-swipe-action-item> -->
</template>
<style lang="scss" scoped></style>
