<!--
 * @Date: 2023-07-03 19:31:10
 * @LastEditTime: 2023-07-03 19:52:23
 * 介绍:
-->
<script lang="ts" setup>
import { StyleValue } from "vue";
import { BoxPosition } from "../../types/index";
import { filterObject } from "@@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    /**是否显示遮罩 */
    overlay?: boolean;
    /**弹出方向 */
    mode?: BoxPosition;
    /**遮罩打开或收起的动画过渡时间，单位ms */
    duration?: StrNumber;
    /**是否显示关闭图标 */
    closeable?: boolean;
    /**遮罩自定义样式，一般用于修改遮罩颜色，如：{background: 'rgba(3, 100, 219, 0.5)'} */
    overlayStyle?: StyleValue;
    /**遮罩透明度，0-1之间，勿与overlayStyle共用 */
    overlayOpacity?: StrNumber;
    /**点击遮罩是否关闭弹窗（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） */
    closeOnClickOverlay?: boolean;
    zIndex?: StrNumber;
    /**是否为留出底部安全距离 */
    safeAreaInsetBottom?: boolean;
    /**是否留出顶部安全距离（状态栏高度）	 */
    safeAreaInsetTop?: boolean;
    /**自定义关闭图标位置 */
    closeIconPos?: `${"top" | "bottom"}-${"left" | "right"}`;
    /**设置圆角值，仅对mode = top | bottom | cener有效 */
    round?: StrNumber;
    /**当mode=center时 是否开启缩放 */
    zoom?: boolean;
    bgColor?: string;
    /**用户自定义样式 */
    customStyle?: StyleValue;
  }>(),
  {
    zoom: true,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    overlay: true,
  }
);
const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
}>();
</script>
<template>
  <u-popup :="filterObject(props)" @open="emit('open')" @close="emit('close')">
    <slot></slot>
  </u-popup>
</template>
<style lang="scss" scoped></style>
