<!--
 * @Date: 2023-04-21 18:13:53
 * @LastEditTime: 2023-07-03 16:10:18
 * 介绍:选择菜单栏
-->
<script lang="ts" setup generic="Item extends RTabsListItem">
import { Tabs } from "uview-plus"

import { StyleValue } from "vue";
import { filterObject } from "@/utils/tools/object";
export interface RTabsListItem {
  name?: string;
  badge?: Badge;
  disabled?: boolean;
  [k: string]: any;
}
export interface Badge {
  isDot?: boolean;
  value?: number;
}

const props = withDefaults(
  defineProps<{
    list: Item;
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
    keyName?: keyof Item;
  }>(),
  {
    lineHeight: "2px",
    lineWidth: "30px",
    scrollable: false,
  }
);

const emit = defineEmits<{
  (e: "click", v: RTabsListItem & { index: number }): void;
  (e: "change", v: RTabsListItem & { index: number }): void;
}>();
</script>
<template>
  <Tabs v-bind="filterObject(props as any)" @click="(e: any) => emit('click', e)" @change="(e: any) => emit('change', e)">
    <template #right>
      <slot name="right"></slot>
    </template>
  </Tabs>
</template>
<style lang="scss" scoped></style>
