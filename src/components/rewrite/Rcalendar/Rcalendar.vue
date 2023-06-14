<!--
 * @Date: 2023-06-13 16:30:49
 * @LastEditTime: 2023-06-13 17:59:25
 * @FilePath: /music-client/src/components/rewrite/Rcalendar/Rcalendar.vue
 * 介绍:
-->
<script lang="ts" setup>
import { CustomListItem } from "./index";
import { filterParams } from "@@/utils/tools/object";

const props = defineProps<{
  title?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  /**multiple-可以选择多个日期，range-选择日期范围（多个月需配合monthNum属性使用） */
  mode?: "single" | "multiple" | "range";
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
  formatter?: Function;
  showLunar?: boolean;
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
}>();
const emit = defineEmits<{
  (e: "confirm", v: any): void;
  (e: "close", v: any): void;
}>();
function setFormatter(callback: Function) {
  return calendarRef.value?.setFormatter(callback);
}
const calendarRef = ref();
defineExpose({ setFormatter });
</script>
<template>
  <u-calendar
    ref="calendarRef"
    :="filterParams(props)"
    @confirm="(e:any) => emit('confirm', e)"
    @close="(e:any) => emit('close', e)"
  ></u-calendar>
</template>
<style lang="scss" scoped></style>
