<!--
 * @Date: 2023-03-23 14:18:19
 * @LastEditTime: 2023-07-03 15:06:09
 * 介绍:
-->
<script lang="ts" setup>
import { JustifyItems, AlignItems } from "@/components/types";
import { filterObject } from "@/utils/tools/object";

import { Globals } from "csstype";

const props = withDefaults(
  defineProps<{
    /**gap */
    gap?: string;
    /**row-gap */
    rowGap?: string;
    /**col-gap */
    colGap?: string;
    /**justify-items 默认center */
    justify?: JustifyItems;
    /**align-items 默认center */
    align?: AlignItems;
    /**grid-auto-columns */
    autoCol?: string;
    /**grid-auto-rows */
    autoRow?: string;
    /**grid-auto-flow: 自动排列方式 */
    autoFlow?: "dense" | "column" | "row" | Globals;
    /**多少行网格 */
    row?: StrNumber;
    /**多少列网格 */
    col?: StrNumber;
    /**row或col为number情况下css repeat函数的单位,默认:1fr */
    repeat?: string;
  }>(),
  {
    gap: "var(--gap-sm)",
    col: 3,
    repeat: "auto",
    align: "center",
    justify: "center",
  }
);
const gridTemplateColumns = computed(() => {
  const number = Number(props.col);
  if (isNaN(number)) return props.col;
  return repeat(number, props.repeat || "auto");
});
const gridTemplateRows = computed(() => {
  const number = Number(props.row);
  if (isNaN(number)) return props.row;
  return repeat(number, props.repeat || "auto");
});

function repeat(number: number, symbol: string) {
  return `repeat(${number},${symbol})`;
}
</script>

<template>
  <view
    class="Cgrid"
    :style="
      filterObject({
        '--Cgrid-gap': props.gap,
        '--Cgrid-justifyItems': props.justify,
        '--Cgrid-alignItems': props.align,
        '--Cgrid-gridAutoColumns': props.autoCol,
        '--Cgrid-gridAutoRows': props.autoRow,
        '--Cgrid-gridAutoFlow': props.autoFlow,
        columnGap: props.colGap,
        rowGap: props.rowGap,
        gridTemplateColumns,
        gridTemplateRows,
      })
    "
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.Cgrid {
  display: grid;
  gap: var(--Cgrid-gap);
  justify-items: var(--Cgrid-justifyItems);
  align-items: var(--Cgrid-alignItems);
  grid-auto-columns: var(--Cgrid-gridAutoColumns);
  grid-auto-rows: var(--Cgrid-gridAutoRows);
  grid-auto-flow: var(--Cgrid-gridAutoFlow);
}
</style>
