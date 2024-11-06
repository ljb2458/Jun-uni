<script lang="ts" setup>
// import { filterObject } from "@/utils/tools/object";
const props = withDefaults(
  defineProps<{
    /**线条的颜色 */
    color: string;
    /**长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等 */
    length: StrNumber;
    /**线条的方向 */
    direction: "row" | "column";
    /**是否显示细边框 */
    hairline: boolean;
    /**线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx"，默认单位px */
    margin: StrNumber;
    /**是否虚线 */
    dashed: boolean;
  }>(),
  {
    hairline: true,
  }
);
</script>
<template>
  <!-- <u-line :="filterObject(props)"></u-line> -->
</template>
<style lang="scss" scoped></style>
