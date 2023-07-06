<!--
 * @Date: 2023-07-03 17:32:03
 * @LastEditTime: 2023-07-04 11:03:00
 * 介绍:复选框群组组件
-->
<script lang="ts" setup>
// import { filterObject } from "@@/utils/tools/object";

const props = defineProps<{
  name?: string;
  modelValue?: StrNumber[];
  /**形状，circle-圆形，square-方形 */
  shape?: "square" | "circle";
  /**是否禁用全部checkbox */
  disabled?: boolean;
  /** #42b983; 颜色选中区域的背景色。 可选值 */
  activeColor?: string;
  /** 未选中的颜色*/
  inactiveColor?: string;
  size?: string;
  /**布局方式，row-横向，column-纵向 */
  placement?: "row" | "column";
  labelSize?: string;
  labelColor?: string;
  /**是否禁止点击文本操作 */
  labelDisabled?: boolean;
  iconColor?: string;
  iconSize?: StrNumber;
  /**勾选图标的对齐方式，left-左边，right-右边 */
  iconPlacement?: "left" | "right";
  /**竖向配列时，是否显示下划线 */
  borderBottom?: boolean;
}>();
const emit = defineEmits<{
  (e: "change", v: StrNumber[]): void;
  (e: "update:modelValue", v: StrNumber[] | undefined): void;
}>();
// const $modelValue = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(v) {
//     emit("update:modelValue", v);
//   },
// });
</script>
<template>
  <!-- <u-checkbox-group
    :="filterObject(props)"
    v-model="$modelValue"
    @change="(e:any)=>emit('change',e)"
  >
    <slot></slot>
  </u-checkbox-group> -->
  <slot></slot>
</template>
<style lang="scss" scoped></style>
