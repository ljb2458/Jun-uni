<script lang="ts" setup>
// import { filterObject } from "@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    /**开始值 */
    startVal: StrNumber;
    /**结束值 */
    endVal: StrNumber;
    /**滚动过程所需的时间，单位ms */
    duration: StrNumber;
    /**是否自动开始滚动 */
    autoplay: boolean;
    /**要显示的小数位数，见上方说明 */
    decimals: StrNumber;
    /**滚动结束时，是否缓动结尾，见上方说明 */
    useEasing: boolean;
    /**十进制分割 */
    decimal: string;
    color: string;
    fontSize: StrNumber;
    /**字体是否加粗 */
    bold: boolean;
    /**千位分隔符 */
    separator: string;
  }>(),
  {
    autoplay: true,
    useEasing: true,
  }
);
const emit = defineEmits<{
  (e: "end"): void;
}>();
/**autoplay为false时，通过此方法启动滚动 */
function start() {
  ucountTo.value?.start();
}
/**暂停后重新开始滚动(从暂停前的值开始滚动) */
function reStart() {
  ucountTo.value?.reStart();
}
/**暂停滚动 */
function paused() {
  ucountTo.value?.paused();
}
const ucountTo = ref();
defineExpose({ start, reStart, paused });
</script>
<template>
  <!-- <u-count-to
    ref="ucountTo"
    :="filterObject(props)"
    @end="emit('end')"
  ></u-count-to> -->
</template>
<style lang="scss" scoped></style>
