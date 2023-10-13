<!--
 * @Date: 2023-07-06 15:16:48
 * @LastEditTime: 2023-07-06 15:31:39
 * 介绍:
-->
<script lang="ts" setup>
import { filterObject } from "@/utils/tools/object";
import type { StyleValue } from "vue";
const props = withDefaults(
  defineProps<{
    /**步进器标识符，在change回调返回 */
    name?: StrNumber;
    /**用于双向绑定的值，初始化时设置设为默认min值(最小值) */
    value?: StrNumber;
    /**用户可输入的最小值 */
    min?: StrNumber;
    max?: StrNumber;
    /**步长，每次加或减的值， 支持小数值，如需小数 */
    step?: StrNumber;
    /**是否只能输入正整数 */
    integer?: boolean;
    /**是否禁用操作，包括输入框，加减按钮 */
    disabled?: boolean;
    /**是否禁止输入框 */
    disabledInput?: boolean;
    /**是否开启异步变更，开启后需要手动控制输入值 */
    asyncChange?: boolean;
    /**输入框宽度，单位px */
    inputWidth?: StrNumber;
    /**是否显示减少按钮 */
    showMinus?: boolean;
    /**是否显示增加按钮 */
    showPlus?: boolean;
    /**显示的小数位数 */
    decimalLength?: StrNumber;
    /**是否允许长按进行加减 */
    longPress?: boolean;
    color?: string;
    /**按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致 */
    buttonSize?: StrNumber;
    bgColor?: string;
    /**指定光标于键盘的距离，避免键盘遮挡输入框，单位px */
    cursorSpacing?: StrNumber;
    /**是否禁用增加按钮 */
    disablePlus?: boolean;
    /**是否禁用减少按钮 */
    disableMinus?: boolean;
    /**加减按钮图标的样式*/
    iconStyle?: StyleValue;
  }>(),
  {
    showMinus: true,
    showPlus: true,
    longPress: true,
  }
);
//   defineSlots<{
//     minus?: (props: {}) => any;
//     input?: (props: {}) => any;
//     plus?: (props: {}) => any;
//   }>();
const emit = defineEmits<{
  (e: "focus", v: { value: StrNumber; name: StrNumber }): void;
  (e: "blur", v: { value: StrNumber; name: StrNumber }): void;
  (e: "change", v: { value: StrNumber; name: StrNumber }): void;
  /**超过范围阈值时触发 */
  (e: "overlimit", type: "minus" | "plus"): void;
}>();
</script>
<template>
  <u-number-box
    :="filterObject(props)"
    @focus="(e:any)=>emit('focus', e)"
    @blur="(e:any)=>emit('blur', e)"
    @change="(e:any)=>emit('change', e)"
    @overlimit="(e:any)=>emit('overlimit', e)"
  >
    <!-- <template v-if="$slots.minus" #minus>
      <slot name="minus"></slot>
    </template>
    <template v-if="$slots.input" #input>
      <slot name="input"></slot>
    </template>
    <template v-if="$slots.plus" #plus>
      <slot name="plus"></slot>
    </template> -->
    <!-- <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template> -->
  </u-number-box>
</template>
<style lang="scss" scoped></style>
