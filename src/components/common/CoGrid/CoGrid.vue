<!-- css grid 布局 可搭配 CoGridItem 使用 -->
<script lang="ts" setup>
import type { Property, Globals } from "csstype";
import { filterObject } from "@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    /**gap */
    gap?: string;
    /**row-gap */
    rowGap?: string;
    /**col-gap */
    colGap?: string;
    /**justify-items 默认center */
    justify?: Property.JustifyItems;
    /**align-items 默认center */
    align?: Property.AlignItems;
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
    class="CoGrid"
    :style="
      filterObject({
        '--CoGrid-gap': props.gap,
        '--CoGrid-justifyItems': props.justify,
        '--CoGrid-alignItems': props.align,
        '--CoGrid-gridAutoColumns': props.autoCol,
        '--CoGrid-gridAutoRows': props.autoRow,
        '--CoGrid-gridAutoFlow': props.autoFlow,
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
.CoGrid {
  display: grid;
  gap: var(--CoGrid-gap);
  justify-items: var(--CoGrid-justifyItems);
  align-items: var(--CoGrid-alignItems);
  grid-auto-columns: var(--CoGrid-gridAutoColumns);
  grid-auto-rows: var(--CoGrid-gridAutoRows);
  grid-auto-flow: var(--CoGrid-gridAutoFlow);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
