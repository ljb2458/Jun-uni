<!--
 * @Date: 2023-06-13 18:01:56
 * @LastEditTime: 2023-07-03 16:10:10
 * 介绍:轮播图组件
-->
<script lang="ts" setup>
import type { StyleValue } from "vue";
import { Mode } from "../Rimage/index";
import { ListItem } from "./index";
import { filterObject } from "@@/utils/tools/object";

const props = defineProps<{
  indicator?: boolean;
  /**指示器激活的颜色 */
  indicatorActiveColor?: string;
  /**指示器非激活颜色 */
  indicatorInactiveColor?: string;
  indicatorStyle?: StyleValue;
  indicatorMode?: "line" | "dot";
  list?: ListItem;
  /**是否自动切换 */
  autoplay?: boolean;
  /**current */
  current?: StrNumber;
  /**当前所在滑块的 item-id ，不能与 current 被同时指定 */
  currentItemId?: string;
  interval?: StrNumber;
  duration?: StrNumber;
  circular?: boolean;
  /**前边距，可用于露出前一项的一小部分，nvue和支付宝不支持 */
  previousMargin?: StrNumber;
  /**后边距，可用于露出后一项的一小部分，nvue和支付宝不支持 */
  nextMargin?: StrNumber;
  acceleration?: boolean;
  /**同时显示的滑块数量，nvue、支付宝小程序不支持 */
  displayMultipleItems?: number;
  /**指定swiper切换缓动动画类型， 只对微信小程序有效 */
  easingFunction?: string;
  /**list数组中指定对象的目标属性名 */
  keyName?: string;
  /**图片显示模式 */
  imgMode?: Mode;
  height?: StrNumber;
  bgColor?: string;
  radius?: StrNumber;
  loading?: boolean;
  showTitle?: boolean;
}>();
const emit = defineEmits<{
  (e: "click", v: number): void;
  (e: "change", v: number): void;
}>();
</script>
<template>
  <u-swiper
    :="filterObject(props)"
    @click="(e:any)=>emit('click',e)"
    @change="(e:any)=>emit('change',e)"
  >
    <template v-if="$slots.indicator" #indicator>
      <slot name="indicator"></slot>
    </template>
  </u-swiper>
</template>
<style lang="scss" scoped></style>
