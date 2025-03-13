<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
import router from "@/utils/router";
import { defaultStyle } from "./setCustomNavbar";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

const props = defineProps<{
  useSafetyTop?: boolean;
  useCustomNavbar?: boolean;
}>();

const routeInfo = getCurrentRouteInfo();
const isCustomNavbar = computed(
  () => routeInfo?.style?.navigationStyle === "custom"
);
</script>
<template>
  <view
    class="customNavbar"
    :class="{ customNavbar__hid: !useCustomNavbar }"
    v-if="isCustomNavbar"
  >
    <view
      v-if="props.useSafetyTop"
      style="height: var(--status-bar-height)"
    ></view>
    <block v-if="useCustomNavbar">
      <view :style="{ ...defaultStyle }" class="navbar flex-A-C">
        <CoIcon
          class="customNavbar_backIcon MR-xs"
          color="inherit"
          size="1em"
          v-if="!routeInfo?.tabbar"
          @tap="router.back()"
          name="cicon-fanhui"
        />
        <view>
          <slot :slotProps="{ ...routeInfo! }">
            {{ routeInfo?.style?.navigationBarTitleText }}
          </slot>
        </view>
      </view>
      <view class="customNavbar_bottom PB-xs border-B"></view>
    </block>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding-left: var(--gap-md);
  color: var(--C-B1);
  transition: all 0.3s;
  background-image: var(--C-LG1);
  box-sizing: border-box;
  .customNavbar_backIcon {
    display: block;
  }
}
.customNavbar__hid {
  opacity: 0;
  visibility: hidden;
}
</style>
