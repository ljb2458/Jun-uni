<!-- 正负数字展示组件；正数默认为绿色、负数默认为红色。 -->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    value?: StrNumber;
    /**为正时颜色 */
    plusClass?: any;
    /**为负时颜色 */
    minusClass?: any;
    /**是否显示正负符号 */
    showSymbol?: boolean;
    leftText?: string;
    rightText?: string;
    /**数字为正时显示的符号 */
    plusSymbol?: string;
    /**数字为负时显示的符号 */
    minusSymbol?: string;
  }>(),
  {
    value: "--",
    plusClass: "c-jun-success",
    minusClass: "c-jun-fail",
    showSymbol: false,
  }
);
const isMinus = computed(() => Number(props.value) < 0);


const currentClass= computed(()=>isMinus.value ? props.minusClass : props.plusClass)
const symbol = computed(() =>
  isMinus.value ? props.minusClass : props.plusSymbol
);
const $value = computed(() => {
  if (isNaN(Number(props.value)) || (!props.value && props.value !== 0))
    return "--";
  let value = props.value.toString().replace(/^-/, "");
  if (!props.showSymbol) return value;
  return symbol.value + value;
});
</script>

<template>
  <text
  class="CoPlusMinus"
   :class="[currentClass]"
  >
    <slot name="left"> </slot>
    {{ leftText }}{{ $value }}{{ rightText }}
    <slot name="right"></slot>
  </text>
</template>

<style lang="scss" scoped>
.CPlusMinus__bg {
  padding: 0 0.4em;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
