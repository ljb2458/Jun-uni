<!--
 * @Date: 2023-06-13 16:30:49
 * @LastEditTime: 2023-07-06 19:24:17
 * 介绍:日期选择器
-->
<script lang="ts" setup>
import { CustomListItem, Mode } from "./index";
import { filterObject } from "@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    title?: string;
    showTitle?: boolean;
    /**是否显示副标题 */
    showSubtitle?: boolean;
    /**multiple-可以选择多个日期，range-选择日期范围（多个月需配合monthNum属性使用） */
    mode?: Mode;
    /**mode=range时，第一个日期底部的提示文字 */
    startText?: string;
    /**mode=range时，第一个日期底部的提示文字 */
    endText?: string;
    customList?: CustomListItem[];
    color?: string;
    minDate?: StrNumber;
    maxDate?: StrNumber;
    defaultDate?: string | Date | CustomListItem;
    maxCount?: StrNumber;
    rowHeight?: StrNumber;
    formatter?: (time: CustomListItem) => CustomListItem;
    /**是否显示农历 */
    showLunar?: boolean;
    /**是否显示月份背景色 */
    showMark?: boolean;
    confirmText?: string;
    confirmDisabledText?: string;
    show?: boolean;
    /**是否允许点击遮罩关闭日历 （注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） */
    closeOnClickOverlay?: boolean;
    readonly?: boolean;
    maxRange?: StrNumber;
    /**范围选择超过最多可选天数时的提示文案，mode = range时有效 */
    rangePrompt?: string;
    /**范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效 */
    showRangePrompt?: boolean;
    /**	是否允许日期范围的起止时间为同一天，mode = range时有效 */
    allowSameDay?: boolean;
    round?: StrNumber;
    /**最大展示的月份数量 */
    monthNum?: StrNumber;
  }>(),
  {
    closeOnClickOverlay: true,
    showMark: true,
    showSubtitle: true,
    showTitle: true,
    showRangePrompt: true,
  }
);
const emit = defineEmits<{
  (e: "confirm", v: string[]): void;
  (e: "close"): void;
}>();
function setFormatter(callback: Function) {
  return calendarRef.value?.setFormatter(callback);
}
const calendarRef = ref();
defineExpose({ setFormatter });
</script>
<template>
  <!-- #ifndef APP-PLUS -->
  <u-calendar
    ref="calendarRef"
    :="filterObject(props)"
    @confirm="(e:any) => emit('confirm', e)"
    @close="(e:any) => emit('close')"
  ></u-calendar>
  <!-- #endif --> 
</template>
<style lang="scss" scoped></style>
