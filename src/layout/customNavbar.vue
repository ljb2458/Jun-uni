<!-- 全局自定义导航栏 -->
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
      <view :style="{ ...defaultStyle }" class="navbar flex items-center">
        <CoIcon
          class="customNavbar_backIcon mr-1"
          color="inherit"
          size="1em"
          v-if="!routeInfo?.tabbar"
          @tap="router.back()"
          name="cicon-fanhui"
        />
        <view class="flex flex-1">
          <slot :slotProps="{ ...routeInfo! }">
            {{ routeInfo?.style?.navigationBarTitleText }}
          </slot>
        </view>
      </view>
    </block>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  position: sticky;
  top: 0;
  z-index: 100;
  @apply c-white pl-sm;
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
