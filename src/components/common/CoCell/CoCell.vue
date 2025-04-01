<!-- cell单元格 -->
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
    shadow: false,
    rightIcon: true,
    active: true,
    bg: "var(--C-B1)",
    mode: "bg",
    borderColor: "var(--C-T1-O2)",
  }
);
const emit = defineEmits<{
  (e: "click", v: MouseEvent): void;
}>();
</script>

<template>
  <view
    @click="(e:any) => emit('click', e)"
    :style="{
      '--cell-bg': bg,
      '--border-c': props.borderColor,
      '--shadow-c': props.shadowColor,
    }"
    :class="[
      {
        shadow: props.mode === 'bg' && props.shadow,
        CoCell__bg: props.mode === 'bg',
        CoCell__active: active,
        CoCell_border: props.mode === 'border',
        'border-B': props.mode === 'border',
      },
    ]"
    class="CoCell"
  >
    <view class="flex-1">
      <slot name="left">
        <view class="flex-A-C">
          <CoIcon v-if="leftIcon" :name="leftIcon" />
          <view>{{ leftText }}</view>
        </view>
      </slot>
    </view>
    <slot name="right">
      <view class="F-S-sm">{{ rightText }}</view>
    </slot>
    <view class="CoCell_right_icon">
      <slot v-if="rightIcon !== false" name="right-icon">
        <uv-icon v-if="rightIcon === true" name="arrow-right"></uv-icon>
        <CoIcon v-else-if="rightIcon" :name="rightIcon" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoCell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--R-sm);
}
.CoCell_border {
  border-radius: 0;
  padding: var(--gap-sm) 0;
}
.CoCell__bg {
  background: var(--cell-bg);
  padding: var(--gap-sm);
}
.CoCell__active {
  &:active {
    background: var(--C-B3);
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
