<!-- 竖状步骤条布局 -->
<script setup lang="ts"></script>

<template>
  <view
    class="CoStepLine PB-md"
    :style="{
      gridTemplateColumns: `${$slots.left ? '1fr' : ''} auto ${
        $slots.right ? '1fr' : ''
      }`,
    }"
  >
    <view v-if="$slots.left" class="CoStepLine_left">
      <slot name="left"></slot>
    </view>
    <view class="CoStepLine_gap">
      <slot name="dot">
        <view class="CoStepLine_dot"></view>
      </slot>
      <view class="CoStepLine_line"></view>
    </view>
    <view v-if="$slots.right" class="CoStepLine_right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoStepLine {
  display: grid;
  justify-items: end;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  .CoStepLine_right {
    justify-self: start;
  }
  .CoStepLine_left,
  .CoStepLine_right {
    width: 100%;
  }
  .CoStepLine_gap {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    --size: 1em;
    .CoStepLine_dot {
      height: var(--size);
      width: var(--size);
      background-color: var(--C-M1);
      border-radius: var(--R-max);
      border: solid 0.25em var(--C-T1);
    }
    .CoStepLine_line {
      flex: 1;
      border-left: dotted 1px var(--C-T1);
    }
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
