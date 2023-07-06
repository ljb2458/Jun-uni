<!--
 * @Date: 2023-07-03 20:13:29
 * @LastEditTime: 2023-07-05 14:50:10
 * 介绍:折叠面板 二次封装会导致微信小程序出现问题，使用这种方法添加类型声明
-->

<script lang="ts" setup>
// import { filterObject } from "@@/utils/tools/object";

const props = withDefaults(
  defineProps<{
    /**当前展开面板的name，非手风琴模式：[<String | Number>]，手风琴模式：String | Number */
    value?: StrNumber | StrNumber[];
    /**是否手风琴模式 */
    accordion?: boolean;
    /**是否显示外边框 */
    border?: boolean;
  }>(),
  {
    border: true,
  }
);
const emit = defineEmits<{
  (e: "change", v: StrNumber | StrNumber[]): void;
  (e: "open", v: StrNumber | StrNumber[]): void;
  (e: "close", v: StrNumber | StrNumber[]): void;
}>();
// const $modelValue = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(v) {
//     emit("update:modelValue", v);
//   },
// });
function init() {
  // collapse.value?.init();
}
// const collapse = ref();
defineExpose({ init });
</script>
<template>
  <!-- <u-collapse
    ref="collapse"
    :="filterObject(props)"
    v-model="$modelValue"
    @change="(e:any)=>emit('change',e)"
    @open="(e:any)=>emit('open',e)"
    @close="(e:any)=>emit('close',e)"
  >
    <slot></slot>
  </u-collapse> -->
  <slot></slot>
</template>
<style lang="scss" scoped></style>
