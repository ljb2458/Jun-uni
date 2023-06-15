<!--
 * @Date: 2023-04-13 15:20:52
 * @LastEditTime: 2023-05-10 22:58:58
 * @FilePath: /wkw/src/components/common/CplusMinus.vue
 * 介绍:
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    value?: StrNumber;
    /**为正时颜色 */
    plusColor?: string;
    /**为负时颜色 */
    minusColor?: string;
    /**是否显示正负符号 */
    showSymbol?: boolean;
    radius?: string;
    mode?: "bg" | "text";
    leftText?: string;
    rightText?: string;
  }>(),
  {
    value: "--",
    plusColor: "var(--C-success)",
    minusColor: "var(--C-fail)",
    radius: "var(--R-sm)",
    mode: "bg",
    showSymbol: false,
  }
);
const isMinus = computed(() => Number(props.value) < 0);
const $style = computed(() => ({
  background: isBg() ? currentColor() : "",
  color: isText() ? currentColor() : "var(--C-B1)",
  borderRadius: props.radius,
}));

/**获得当前颜色 */
function currentColor() {
  return isMinus.value ? props.minusColor : props.plusColor;
}

/**是文本模式 */
function isText() {
  return props.mode === "text";
}

/**是背景模式 */
function isBg() {
  return props.mode === "bg";
}
const symbol = computed(() => (isMinus.value ? "-" : "+"));
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
    :class="{
      CplusMinus__bg: props.mode == 'bg',
    }"
    :style="$style"
  >
    <slot name="left"> </slot>
    {{ leftText }}{{ $value }}{{ rightText }}
    <slot name="right"></slot>
  </text>
</template>

<style lang="scss" scoped>
.CplusMinus__bg {
  padding: 0 0.4em;
}
</style>
