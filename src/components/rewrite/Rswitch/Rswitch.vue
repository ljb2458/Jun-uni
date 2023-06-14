<!--
 * @Date: 2023-06-13 19:50:26
 * @LastEditTime: 2023-06-14 13:01:01
 * @FilePath: /music-client/src/components/rewrite/Rswitch/Rswitch.vue
 * 介绍:
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";

const props = defineProps<{
  loading?: boolean;
  disabled?: boolean;
  size?: StrNumber;
  activeColor?: string;
  /**关闭时的背景色 */
  inactiveColor?: string;
  modelValue?: boolean | StrNumber;
  /**switch打开时的值 */
  activeValue?: boolean | StrNumber;
  /**是否开启异步变更，开启后需要手动控制输入值 */
  asyncChange?: boolean;
  /**圆点与外边框的距离 */
  space?: StrNumber;
}>();
const emit = defineEmits<{
  (e: "change", v: boolean | StrNumber): void;
  (e: "input", v: boolean | StrNumber): void;
  (e: "update:modelValue", v: boolean | StrNumber): void;
}>();
const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v || false);
  },
});
const $props = computed(() => filterParams(props));
</script>
<template>
  <u-switch
    :="$props"
    v-model="modelValue"
    @change="(e:any)=>emit('change',e)"
    @input="(e:any)=>emit('input',e)"
  ></u-switch>
</template>
<style lang="scss" scoped></style>
