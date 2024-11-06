<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
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
