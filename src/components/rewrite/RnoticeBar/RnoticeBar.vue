<!--
 * @Date: 2023-07-06 12:16:59
 * @LastEditTime: 2023-07-06 12:24:23
 * 介绍:滚动通知
-->
<script lang="ts" setup>
import { filterObject } from "@@/utils/tools/object";
const props = defineProps<{
  text: string;
  /**通告滚动模式，row-横向滚动，column-竖向滚动 */
  direction: "row" | "column";
  /**direction = row时，是否使用步进形式滚动 */
  step: boolean;
  /**左侧图标 */
  icon: string;
  /**通告模式，link-显示右箭头，closable-显示右侧关闭图标 */
  mode: "closable" | "link";
  color: string;
  bgColor: string;
  /**水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度 */
  speed: StrNumber;
  fontSize: StrNumber;
  /**滚动一个周期的时间长，单位ms */
  duration: StrNumber;
  /**是否禁止用手滑动切换 */
  disableTouch: boolean;
  /**跳转的页面路径  */
  url: string;
  /**页面跳转的类型 */
  linkType: "navigateTo" | "redirectTo" | "switchTab" | "reLaunch";
}>();
const emit = defineEmits<{
  (e: "click", index: number): void;
  (e: "close"): void;
}>();
</script>
<template>
  <u-notice-bar
    :="filterObject(props)"
    @click="(e:any) => emit('click', e)"
    @close="(e:any) => emit('close')"
  ></u-notice-bar>
</template>
<style lang="scss" scoped></style>
