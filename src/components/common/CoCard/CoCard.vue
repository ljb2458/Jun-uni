<script lang="ts" setup>
import type { Property } from "csstype";
const props = withDefaults(
  defineProps<{
    /**背景颜色 */
    bgImg?: string;
    shadowColor?: string;
    shadow?: boolean;
    bgRepeat?: Property.BackgroundRepeat;
    bgSize?: Property.BackgroundSize;
    bgPosition?: Property.BackgroundPosition;
  }>(),
  {
    shadowColor: "rgba(0,0,0,0.2)",
    shadow: false,
    bgRepeat: "no-repeat",
    bgSize: "cover",
  }
);
</script>

<template>
  <view
    :style="{
      background: bgImg || false,
      '--SHc': props.shadowColor,
      backgroundRepeat: props.bgRepeat,
      backgroundSize: props.bgSize,
      backgroundPosition: props.bgPosition,
    }"
    class="CoCard"
    :class="{ shadow: shadow }"
  >
    <uv-image
      class="CoCard_bgImg"
      v-if="bgImg"
      :src="bgImg"
      width="100%"
      :mode="'widthFix'"
    />
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CoCard {
  position: relative;
  border-radius: var(--R-sm);
  .CoCard_bgImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
