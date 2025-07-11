<!-- 卡片 -->
<script lang="ts" setup>
import { StyleValue } from "vue";
const props = withDefaults(
  defineProps<{
    /**背景盒子样式 */
    bgboxStyle?: StyleValue;
    /**背景盒子模糊 */
    bgboxBlur?: string;
    /**背景盒子class */
    bgboxClass?: any;
    /**背景图片，小程序APP中使用背景图片受限，故使用一个定位图片实现背景图片 */
    bgImg?: string;
  }>(),
  {
    bgboxBlur: "none",
    bgRepeat: "no-repeat",
    bgSize: "cover",
  }
);
</script>

<template>
  <view
    :style="{
      background: bgImg || false,
    }"
    class="CoCard"
  >
    <view
      class="CoCard_bgbox"
      :class="bgboxClass"
      :style="[
        bgboxStyle,
        {
          filter: `blur(${bgboxBlur})`,
        },
      ]"
    >
      <slot name="bgbox">
        <uv-image
          class="CoCard_bgImg"
          v-if="bgImg"
          :src="bgImg"
          width="100%"
          :mode="'widthFix'"
        />
      </slot>
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CoCard {
  @apply rd-md relative;
  .CoCard_bgbox {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
