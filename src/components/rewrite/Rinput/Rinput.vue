<!--
 * @Date: 2023-02-19 18:44:54
 * @LastEditTime: 2023-06-13 17:29:30
 * @FilePath: /music-client/src/components/rewrite/Rinput/Rinput.vue
 * 介绍:
-->
<!--
 * @Date: 2023-02-19 18:44:54
 * @LastEditTime: 2023-02-19 20:45:10
 * @FilePath: /my-vue3-project/src/components/rewrite/Input/MInput.vue
 * 介绍:
-->
<script lang="ts" setup>
import { omit } from "lodash";
const props = withDefaults(
  defineProps<{
    type?: "number" | "idcard" | "digit" | "pwd" | "text";
    moduleValue?: StrNumber;
    /**占位文字 */
    placeholder?: StrNumber;
    /**禁用 */
    disabled?: boolean;
    /**自动获取焦点 */
    focus?: boolean;
    /**自动拾取焦点 */
    autoBlur?: boolean;
    /**输入框形状 */
    shape?: "square" | "circle";
    /**是否可清除 */
    clearable?: boolean;
    /**最大长度 */
    maxlength?: number;
    /**显示输入统计 */
    showWordLimit?: boolean;
    /**键盘右下角按钮文字 */
    confirmType?: "send" | "search" | "next" | "go" | "done";
    prefixIcon?: string;
    inputAlign?: "left" | "center" | "right";
    border?: "bottom" | "surround";
    fontSize?: StrNumber;
    readonly?: boolean;
    color?: string;
  }>(),
  {
    color: "var(--C-T1)",
    border: "bottom",
  }
);
const $props = computed(() => omit(props, ["moduleValue"]));
const config = reactive({
  isPassword: props.type == "pwd",
});
const emit = defineEmits<{
  (e: "updat:moduleValue", v: StrNumber | undefined): void;
  (e: "change", v: StrNumber | undefined): void;
  (e: "input", v: StrNumber | undefined): void;
  (e: "confirm", v: StrNumber | undefined): void;
  (e: "blur", v: StrNumber | undefined): void;
  (e: "focus"): void;
  (e: "clear"): void;
}>();
const $moduleValue = computed({
  get() {
    return props.moduleValue;
  },
  set(val) {
    emit("updat:moduleValue", val);
  },
});
function onChangeType() {
  config.isPassword = !config.isPassword;
}
</script>

<template>
  <u-input
    class="Rinput"
    v-bind="$props"
    v-model="$moduleValue"
    :placeholder="props.placeholder"
    :password="config.isPassword"
  >
    <template v-if="$slots.right" #suffix>
      <slot name="right">
        <u-icon
          v-if="props.type == 'pwd'"
          @click="onChangeType"
          :name="config.isPassword ? `eye-fill` : `eye-off`"
        >
        </u-icon>
      </slot>
    </template>
    <template v-if="$slots.left" #prefix>
      <slot name="left"> </slot>
    </template>
  </u-input>
</template>

<style lang="scss" scoped></style>
