<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
const props = defineProps<{
  hidGapLine?: boolean;
  hidDot?: boolean;
}>();
</script>

<template>
  <view class="CoTimerShaftItem">
    <view class="left">
      <slot name="left"></slot>
    </view>
    <view class="CoTimerShaftItem_gap">
      <view v-show="!hidDot" class="CoTimerShaftItem_dot"></view>
      <view v-if="!hidGapLine" class="CoTimerShaftItem_line"></view>
    </view>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.CoTimerShaftItem {
  $dotSize: 1.5em;
  display: grid;
  grid-template-columns: 1fr $dotSize 1fr;
  column-gap: var(--gap-sm);
  height: 100%;

  .CoTimerShaftItem_gap {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    .CoTimerShaftItem_dot {
      width: $dotSize;
      height: $dotSize;
      border-radius: 99999rpx;
      border: dashed 2rpx #000;
      box-sizing: border-box;
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        transform: scale(0.8);
        border-radius: 99999rpx;
        border: solid 2rpx #000;
        background: var(--C-M1);
        box-sizing: border-box;
      }
    }

    .CoTimerShaftItem_line {
      flex: 1;
      box-sizing: border-box;
      border-left: dashed 2rpx #000;
    }
  }
}
</style>
