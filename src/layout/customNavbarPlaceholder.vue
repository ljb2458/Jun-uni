<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
import { defaultStyle } from "./setCustomNavbar";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

const routeInfo = getCurrentRouteInfo();
const isCustomNavbar = computed(
  () => routeInfo?.style?.navigationStyle === "custom"
);
</script>
<template>
  <view class="customNavbar" v-if="isCustomNavbar">
    <view style="height: var(--status-bar-height)"></view>
    <view :style="{ ...defaultStyle }" class="navbar flex-A-C">
      <slot :slotProps="{ ...routeInfo! }"> </slot>
    </view>
    <view class="PB-xs"></view>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding-left: var(--gap-md);
  transition: all 0.3s;
  box-sizing: border-box;
}
</style>
