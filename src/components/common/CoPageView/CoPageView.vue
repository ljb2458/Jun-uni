<!-- 页面视图组件；集成导航栏、对话框、消息提示框、选择面板等 -->
<script lang="ts" setup>
import notify from "@/layout/notify.vue";
import customNavbar from "@/layout/customNavbar.vue";
import actionSheet from "@/layout/actionSheet.vue";
import modal from "@/layout/modal.vue";

import type { onPageScroll } from "@dcloudio/uni-app";
import { defaultStyle } from "@/layout/setCustomNavbar";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

const routeInfo = getCurrentRouteInfo();

const props = withDefaults(
  defineProps<{
    /**使用消息提示 */
    useNotify?: boolean;
    /**使用模态框 */
    useModal?: boolean;
    useSafetyTop?: boolean;
    useCustomNavbar?: boolean;
    useSafetyBottom?: boolean;
    useActionSheet?: boolean;
    onPageScroll?: typeof onPageScroll;
    bgImg?: string;
  }>(),
  {
    useSafetyTop: true,
    useCustomNavbar: true,
    useSafetyBottom: true,
  }
);
const layoutInfo = reactive({
  scrollTop: 0,
});
if (props.onPageScroll) {
  props.onPageScroll((e) => {
    layoutInfo.scrollTop = e.scrollTop;
  });
}

const navbarHeightCssVar = computed(() => {
  if (routeInfo?.style?.navigationStyle === "custom") {
    if (props.useCustomNavbar) {
      return `calc(var(--status-bar-height) + ${
        defaultStyle.height || "0px"
      } + var(--gap-xs))`;
    }
    return `calc(var(--window-top) + var(--status-bar-height))`;
  }
  if (props.useSafetyTop) {
    return `var(--status-bar-height)`;
  }
});
</script>

<template>
  <view
    class="CoPageView"
    :style="{
      '--layout-navbar-height': navbarHeightCssVar,
    }"
  >
    <uv-image
      class="CoPageView__bgImg"
      v-if="bgImg"
      :src="bgImg"
      width="100%"
      :mode="'widthFix'"
    />
    <customNavbar
      :class="{
        customNavbar__fixed: layoutInfo.scrollTop > 0,
      }"
      :useCustomNavbar="useCustomNavbar"
      :useSafetyTop="useSafetyTop"
    >
      <template #default="{ slotProps }">
        <slot :slotProps="routeInfo!" name="customNavbar">{{
          slotProps.style?.navigationBarTitleText
        }}</slot>
      </template>
    </customNavbar>
    <actionSheet v-if="useActionSheet"></actionSheet>
    <notify v-if="useNotify">
      <slot name="notify"></slot>
    </notify>
    <modal v-if="useModal">
      <slot name="modal"></slot>
    </modal>
    <slot></slot>
    <view
      class="safetyBottom"
      v-if="props.useSafetyBottom"
      style="height: var(--window-bottom)"
    >
    </view>
    <view
      :class="key"
      v-for="key in ['CoPageView_bottom_placeholder', 'CoPageView_bottom']"
      :key="key"
      v-if="$slots.fixedBottom"
    >
      <slot name="fixedBottom" :key="key"></slot>
      <view
        class="safetyBottom"
        v-if="props.useSafetyBottom"
        style="height: var(--window-bottom)"
      >
      </view
    ></view>
  </view>
</template>

<style lang="scss" scoped>
.CoPageView {
  --layout-page-height: calc(100vh - var(--layout-navbar-height));
  min-height: calc(100vh - var(--window-top));
  position: relative;
  .CoPageView__bgImg {
    object-fit: none;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -10;
  }
  .CoPageView_bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .CoPageView_bottom_placeholder {
    opacity: 0;
    visibility: hidden;
  }
}
.customNavbar__fixed {
  background: var(--C-B1);
  color: var(--C-T1);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
