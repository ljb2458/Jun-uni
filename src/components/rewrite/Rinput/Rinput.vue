<!--
 * @Date: 2023-02-19 18:44:54
 * @LastEditTime: 2023-07-05 20:25:05
 * 介绍:输入框
-->
<script lang="ts" setup>
import { filterParams } from "@@/utils/tools/object";
import { StyleValue } from "vue";
import { ConfirmType } from "./index";

const props = withDefaults(
  defineProps<{
    /**number：数字；idcard：身份证；digit：整数；pwd：密码；text：文本； */
    type?: "number" | "idcard" | "digit" | "pwd" | "text";
    modelValue?: StrNumber;
    /**占位文字 */
    placeholder?: StrNumber;
    /**是否禁用 */
    disabled?: boolean;
    /**自动获取焦点 */
    focus?: boolean;
    /**键盘收起时，是否自动失去焦点 */
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
    confirmType?: ConfirmType;
    inputAlign?: "left" | "center" | "right";
    border?: "bottom" | "surround";
    fontSize?: StrNumber;
    /**是否只读 */
    readonly?: boolean;
    /**输入框颜色 */
    color?: string;
    /**输入过滤或格式化函数(如需兼容微信小程序，则只能通过setFormatter方法) */
    formatter?: (value: StrNumber) => StrNumber;
    /**定义需要用到的外部样式 */
    customStyle?: StyleValue;
    /**光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
    selectionStart?: StrNumber;
    /**	光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
    selectionEnd?: StrNumber;
    /**键盘弹起时，是否自动上推页面 */
    adjustPosition?: boolean;
    label?: string;
  }>(),
  {
    adjustPosition: true,
    color: "var(--C-T1)",
    border: "bottom",
  }
);
const uinput = ref();
function setFormatter(formatter: (value: StrNumber) => StrNumber) {
  uinput.value?.setFormatter(formatter);
}
defineExpose({ setFormatter });
const $props = computed(() => filterParams(props));
const config = reactive({
  isPassword: props.type == "pwd",
});
const emit = defineEmits<{
  (e: "updat:modelValue", v: StrNumber | undefined): void;
  (e: "change", v: StrNumber): void;
  (e: "input", v: StrNumber): void;
  (e: "blur", v: any): void;
  (e: "focus", v: any): void;
  (e: "clear", v: any): void;
}>();
const $modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("updat:modelValue", val);
  },
});
function onChangeType() {
  config.isPassword = !config.isPassword;
}
</script>

<template>
  <u-input
    ref="uinput"
    class="Rinput"
    v-bind="$props"
    v-model="$modelValue"
    :placeholder="props.placeholder"
    :password="config.isPassword"
    @change="(e:any)=>emit('change',e)"
    @input="(e:any)=>emit('input',e)"
    @blur="(e:any)=>emit('blur',e)"
    @focus="(e:any)=>emit('focus',e)"
    @clear="(e:any)=>emit('clear',e)"
  >
    <template #prefix>
      <view class="flex-A-C">
        <view v-if="props.label" class="T-nowrap MR-xs">
          {{ props.label }}
        </view>
        <slot name="left"> </slot>
      </view>
    </template>
    <template #suffix>
      <slot name="right">
        <u-icon
          :size="fontSize || '18px'"
          :color="color"
          v-if="props.type == 'pwd'"
          @click="onChangeType"
          :name="config.isPassword ? `eye-fill` : `eye-off`"
        >
        </u-icon>
      </slot>
    </template>
  </u-input>
</template>

<style lang="scss" scoped></style>
