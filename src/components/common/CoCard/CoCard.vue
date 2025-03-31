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
    /**阴影颜色 */
    shadowColor?: string;
    /**是否启用阴影效果 */
    shadow?: boolean;

    /**背景图片 */
    bgImg?: string;
  }>(),
  {
    bgboxBlur: "2px",
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
      '--shadow-c': props.shadowColor,
    }"
    class="CoCard"
    :class="{ shadow: shadow }"
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
  position: relative;
  border-radius: var(--R-sm);
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
