<!-- 全局自定义导航栏 -->
<script lang="ts" setup>
import mpMixin from "@/components/libs/mixin/mpMixin";
import router from "@/utils/router";
import { customNavbarInfoStyle } from ".";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

defineOptions(mpMixin);

const props = withDefaults(
  defineProps<{
    useSafetyTop?: boolean;
    useCustomNavbar?: boolean;
    alignCenter?: boolean;
  }>(),
  {
    alignCenter: true,
  }
);

const routeInfo = getCurrentRouteInfo();
const isCustomNavbar = computed(
  () => routeInfo?.style?.navigationStyle === "custom"
);
</script>
<template>
  <view
    class="customNavbar"
    :class="{
      customNavbar__hid: !useCustomNavbar,
      customNavbar__center: alignCenter,
    }"
    v-if="isCustomNavbar"
  >
    <view
      v-if="props.useSafetyTop"
      style="height: var(--status-bar-height)"
    ></view>
    <block v-if="useCustomNavbar">
      <view
        :style="{
          ...customNavbarInfoStyle,
        }"
        class="navbar flex items-center justify-between"
      >
        <CoIcon
          class="customNavbar_backIcon mr-1 w-1em relative z-2"
          color="inherit"
          v-if="!routeInfo?.tabbar"
          @tap="router.back()"
          name="cicon-fanhui"
        />
        <view v-else class="w-1em"></view>
        <view class="navbar_title flex-1">
          <slot :slotProps="{ ...routeInfo! }">
            {{ routeInfo?.style?.navigationBarTitleText }}
          </slot>
        </view>
        <view class="w-1em relative z-2">
          <slot name="right"></slot>
        </view>
      </view>
    </block>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  @apply text-lg bg-jun-primary;
  position: sticky;
  top: 0;
  z-index: 100;
  @apply c-white px-sm;
  transition: all 0.3s;
  box-sizing: border-box;
  .customNavbar_backIcon {
    display: block;
  }
}
.customNavbar__hid {
  opacity: 0;
  visibility: hidden;
}
.customNavbar__center {
  .navbar {
    @apply relative;
    @apply \!pr-0;
    .navbar_title {
      @apply text-center absolute left-0 right-0;
    }
  }
}
</style>
