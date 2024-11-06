<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
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
    borderColor?: string;
  }>(),
  {
    shadowColor: "rgba(0,0,0,0.2)",
    shadow: true,
    bg: "var(--C-B1)",
    mode: "bg",
    borderColor: "var(--C-B1-O2)",
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
      '--BOc': props.borderColor,
      '--SHc': props.shadowColor,
    }"
    :class="[
      {
        'shadow': props.mode === 'bg' && props.shadow,
        CCell__bg: props.mode === 'bg',
        CCell__active: active,
        CCell_border: props.mode === 'border',
        'border-B': props.mode === 'border',
      },
    ]"
    class="CCell"
  >
    <slot name="left-layout">
      <view class="flex-A-C auto-ML-xs">
        <slot name="left">
          <CoIcon v-if="leftIcon" :name="leftIcon" />
          <view>{{ leftText }}</view>
        </slot>
      </view>
    </slot>
    <slot> </slot>
    <slot name="right-layout">
      <view class="flex-A-C auto-ML-xs">
        <slot name="right">
          <view class="F-S-sm">{{ rightText }}</view>
        </slot>
        <slot v-if="rightIcon !== false" name="right-icon">
          <u-icon v-if="rightIcon === true" name="arrow-right"></u-icon>
          <CoIcon v-else-if="rightIcon" :name="rightIcon" />
        </slot>
      </view>
    </slot>
  </view>
</template>

<style lang="scss" scoped>
.CCell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--R-sm);
}
.CCell_border {
  border-radius: 0;
  padding: var(--gap-sm) 0;
}
.CCell__bg {
  background: var(--Cell-bg);
  padding: var(--gap-sm);
}
.CCell__active {
  &:active {
    background: var(--C-B3);
  }
}
</style>
