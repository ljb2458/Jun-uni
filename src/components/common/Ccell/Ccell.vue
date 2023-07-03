<!--
 * @Date: 2023-04-09 21:44:48
 * @LastEditTime: 2023-07-03 16:22:22
 * 介绍:cell单元格
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    leftIcon?: string;
    leftText?: StrNumber;
    rightIcon?: string | boolean;
    rightText?: StrNumber;
    bg?: string;
    active?: boolean;
    shadowColor?: string;
    shadow?: boolean;
    mode?: "bg" | "border" | "none";
    class: any;
  }>(),
  {
    shadowColor: "rgba(0,0,0,0.2)",
    shadow: true,
    bg: "var(--C-B1)",
    mode: "bg",
  }
);
const emit = defineEmits<{
  (e: "click", v: MouseEvent): void;
}>();
</script>

<template>
  <view
    @click="(e) => emit('click', e)"
    :style="{
      '--Cell-bg': bg,
      '--BOc': props.shadowColor,
      '--SHc': props.shadowColor,
    }"
    :class="[
      props.class,
      {
        'shadowVar--SHc': props.mode === 'bg' && props.shadow,
        Ccell__bg: props.mode === 'bg',
        Ccell__active: active,
        Ccell_border: props.mode === 'border',
        'borderVar--BOc': props.mode === 'border',
      },
    ]"
    class="Ccell"
  >
    <slot name="left-layout">
      <view class="flex-A-C auto-ML-xs">
        <slot name="left">
          <Cicon v-if="leftIcon" :name="leftIcon" />
          <view>{{ leftText }}</view>
        </slot>
      </view>
    </slot>
    <slot> </slot>
    <slot name="right-layout">
      <view class="flex-A-C auto-ML-xs">
        <slot name="right">
          <view class="T-S-sm C-T5">{{ rightText }}</view>
        </slot>
        <slot v-if="rightIcon !== false" name="right-icon">
          <u-icon v-if="rightIcon === true" name="arrow-right"></u-icon>
          <Cicon v-else-if="rightIcon" :name="rightIcon" />
        </slot>
      </view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
.Ccell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--R-sm);
}
.Ccell_border {
  border-radius: 0;
  padding: var(--gap-sm) 0;
}
.Ccell__bg {
  background: var(--Cell-bg);
  padding: var(--gap-sm);
}
.Ccell__active {
  &:active {
    background: var(--C-B3);
  }
}
</style>
