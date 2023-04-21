<!--
 * @Date: 2023-04-21 18:13:53
 * @LastEditTime: 2023-04-21 20:20:32
 * @FilePath: /music-client/src/components/rewrite/Rtabs/Rtabs.vue
 * 介绍:
-->
<script lang="ts" setup>
import { RtabsList, RtabsListItem } from "./index";
import { StyleValue } from "vue";
const props = withDefaults(
  defineProps<{
    list: RtabsList;
    duration?: StrNumber;
    /**滑块颜色 */
    lineColor?: string;
    lineWidth?: StrNumber;
    lineHeight?: StrNumber;
    /**滑块背景size */
    lineBgSize?: "cover" | "contain" | "percentage" | string;
    /**菜单item的样式 */
    itemStyle?: StyleValue;
    /**菜单选中样式 */
    activeStyle?: StyleValue;
    /**菜单非选中样式 */
    inactiveStyle?: StyleValue;
    /**菜单是否可滚动 */
    scrollable?: boolean;
    /**当前选中标签的索引 */
    current?: StrNumber;
    /**从list元素对象中读取的键名 */
    keyName?: string;
  }>(),
  {
    lineHeight: "3rpx",
    lineWidth: "60rpx",
    scrollable: false,
  }
);

const emit = defineEmits<{
  (e: "click", v: RtabsListItem & { index: number }): void;
  (e: "change", v: RtabsListItem & { index: number }): void;
}>();
</script>
<template>
  <u-tabs
    v-bind="props"
    @click="(e:any) => emit('click',e)"
    @change="(e:any) => emit('change',e)"
  >
    <template #right><slot name="right"></slot></template>
  </u-tabs>
</template>
<style lang="scss" scoped></style>
