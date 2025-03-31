<!-- 自动正方形；根据盒子的宽度，自动设定盒子高度。 -->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**高度比例；默认为1：正方形。 */
    heightScale?: number;
  }>(),
  {
    heightScale: 1,
  }
);
</script>
<template>
  <view class="CoAutoSquare">
    <view
      :style="{ paddingTop: `${props.heightScale * 100}%` }"
      class="CoAutoSquare_inner"
    >
      <view class="CoAutoSquare_content">
        <slot></slot>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.CoAutoSquare {
  width: 100%;
  .CoAutoSquare_inner {
    position: relative;
    height: 0;
    .CoAutoSquare_content {
      position: absolute;
      inset: 0;
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
