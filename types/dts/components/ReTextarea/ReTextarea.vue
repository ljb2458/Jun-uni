<!--
 * @Date: 2023-07-05 20:00:12
 * @LastEditTime: 2023-07-06 12:34:03
 * 介绍:文本域
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
import { ConfirmType } from "@/components/rewrite/ReInput/ReInput.vue";
import { StyleValue } from "vue";
import Rtextarea from "./RTextarea.vue";
export type Instance = InstanceType<typeof Rtextarea>
export function useRtextareaRef() {
  return ref<Instance>();
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    /**输入框为空时占位符 */
    placeholder?: StrNumber;
    /**输入框高度 */
    height?: StrNumber;
    /**设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效 */
    confirmType?: ConfirmType;
    /**是否禁用 */
    disabled?: boolean;
    /**是否显示统计字数 */
    count?: boolean;
    /**	是否自动获取焦点，nvue不支持，H5取决于浏览器的实现 */
    focus?: boolean;
    /**	是否自动增加高度 */
    autoHeight?: boolean;
    /**如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true */
    fixed?: boolean;
    /**指定光标与键盘的距离 */
    cursorSpacing?: number;
    /**指定focus时的光标位置 */
    cursor?: StrNumber;
    /**是否显示键盘上方带有”完成“按钮那一栏， */
    showConfirmBar?: boolean;
    /**	光标起始位置，自动聚焦时有效，需与selection-end搭配使用 */
    selectionStart?: number;
    /**	光标结束位置，自动聚焦时有效，需与selection-start搭配使用 */
    selectionEnd?: number;
    /**	键盘弹起时，是否自动上推页面 */
    adjustPosition?: boolean;
    /**是否去掉 iOS 下的默认内边距，只微信小程序有效 */
    disableDefaultPadding?: boolean;
    /**focus时，点击页面的时候不收起键盘，只微信小程序有效 */
    holdKeyboard?: boolean;
    /**最大输入长度，设置为 -1 的时候不限制最大长度 */
    maxlength?: StrNumber;
    /**边框类型，surround-四周边框，none-无边框，bottom-底部边框 */
    border?: "none" | "surround" | "bottom";
    /**指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ */
    placeholderClass?: string;
    /**le	指定placeholder的样式，字符串/对象形式 */
    placeholderStyle?: StyleValue;
    /**输入过滤或格式化函数(如需兼容微信小程序，则只能通过setFormatter方法) */
    formatter?: (value: string) => string;
  }>(),
  {
    adjustPosition: true,
    showConfirmBar: true,
  }
);
function setFormatter(formatter: (value: string) => string) {
  textarea.value?.setFormatter(formatter);
}
defineExpose({ setFormatter });
const textarea = ref();
interface LinechangeEvent {
  detail: { height: number; heightRpx: number; lineCount: number };
}
interface BlurEvent {
  detail: {
    value: string;
    cursor: number;
  };
}
interface FocusEvent {
  detail: {
    value: string;
    height: number;
  };
}
interface InputEvent {
  detail: { detail: string };
}
const emit = defineEmits<{
  (e: "updat:modelValue", v: string | undefined): void;
  (e: "input", v: InputEvent): void;
  /**输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0} */
  (e: "linechange", v: LinechangeEvent): void;
  (e: "blur", v: BlurEvent): void;
  (e: "confirm", v: any): void;
  (e: "focus", v: FocusEvent): void;
  (e: "clear", v: any): void;
  /**	键盘高度发生变化的时候触发此事件 */
  (e: "keyboardheightchange", v: any): void;
}>();
const $modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("updat:modelValue", val);
  },
});
</script>
<template>
  <u-textarea ref="textarea" :="filterObject(props)" v-model="$modelValue" @input="(e: any) => emit('input', e)"
    @confirm="(e: any) => emit('confirm', e)" @blur="(e: any) => emit('blur', e)" @focus="(e: any) => emit('focus', e)"
    @clear="(e: any) => emit('clear', e)" @linechange="(e: any) => emit('linechange', e)"
    @keyboardheightchange="(e: any) => emit('keyboardheightchange', e)"></u-textarea>
</template>
<style lang="scss" scoped></style>
