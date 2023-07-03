<!--
 * @Date: 2023-06-13 20:21:48
 * @LastEditTime: 2023-07-03 16:10:04
 * 介绍:滑动选择器
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";
import { StyleValue } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: StrNumber;
    /**	滑块的大小 12 - 28 */
    blockSize: StrNumber;
    /**可选的最小值(0-100之间) */
    min: StrNumber;
    /**可选的最小值(0-100之间) */
    max: StrNumber;
    /**选择的步长 */
    step: StrNumber;
    /**进度条的激活部分颜色 */
    activeColor: string;
    /**进度条的背景颜色 */
    inactiveColor: string;
    /**滑块背景颜色 */
    blockColor: string;
    /**是否显示当前 value */
    showValue: boolean;
    /**滑块按钮自定义样式，对象形式 */
    blockStyle: StyleValue;
  }>(),
  {
    showValue: true,
  }
);
const emit = defineEmits<{
  (e: "input", v: StrNumber): void;
  (e: "changing", v: StrNumber): void;
  (e: "update:modelValue", v: StrNumber): void;
  (e: "change", v: StrNumber): void;
}>();
const $modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
</script>
<template>
  <u-slider
    @input="(e:any) => emit('input',e)"
    @changing="(e:any) => emit('changing',e)"
    @change="(e:any) => emit('change',e)"
    :="filterParams(props)"
    v-model="$modelValue"
  ></u-slider>
</template>
<style lang="scss" scoped></style>
