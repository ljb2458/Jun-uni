<!-- 全局自定义导航栏占位组件 -->
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
import { customNavbarInfoStyle } from ".";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

const routeInfo = getCurrentRouteInfo();
const isCustomNavbar = computed(
  () => routeInfo?.style?.navigationStyle === "custom"
);
</script>
<template>
  <view class="customNavbar" v-if="isCustomNavbar">
    <view style="height: var(--status-bar-height)"></view>
    <view :style="{ ...customNavbarInfoStyle }" class="navbar flex items-center">
      <slot :slotProps="{ ...routeInfo! }"> </slot>
    </view>
    <view class="pb-2px"></view>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  position: sticky;
  top: 0;
  z-index: 100;
  @apply pl-sm;
  transition: all 0.3s;
  box-sizing: border-box;
}
</style>
