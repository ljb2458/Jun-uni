<!-- 页面视图组件；集成导航栏、对话框、消息提示框、选择面板等 -->
<script lang="ts" setup>
import notify from "@/layout/notify/notify.vue";
import customNavbar from "@/layout/customNavbar/customNavbar.vue";
import actionSheet from "@/layout/actionSheet/actionSheet.vue";
import modal from "@/layout/modal/modal.vue";
import loginPopup from "@/layout/loginPopup/loginPopup.vue";
import type { onPageScroll } from "@dcloudio/uni-app";
import { customNavbarInfoStyle } from "@/layout/customNavbar";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";
import mpMixin from "@/components/libs/mixin/mpMixin";
import { CSSProperties, StyleValue } from "vue";
import { modalProps } from "@/layout/modal";
import { generateColors, text } from "@/constants/unocss";

defineOptions(mpMixin);
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
    navbarClass?: any;
    navbarStyle?: StyleValue;
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
        customNavbarInfoStyle.value.height || "0px"
      })`;
    }
    return `calc(var(--window-top) + var(--status-bar-height))`;
  }
  if (props.useSafetyTop) {
    return `var(--status-bar-height)`;
  }
});
const style = computed(() => {
  const colors = generateColors();
  const result: CSSProperties = {
    "--layout-navbar-height": navbarHeightCssVar.value,
    "--wot-color-theme": text(colors["jun-primary"]),
    "--wot-color-success": text(colors["jun-success"]),
    "--wot-color-warning": text(colors["jun-warn"]),
    "--wot-color-danger": text(colors["jun-fail"]),
  };
  return result;
});
</script>

<template>
  <view class="CoPageView" :style="[style]">
    <image
      class="CoPageView__bgImg w-full"
      v-if="bgImg"
      :src="bgImg"
      :mode="'widthFix'"
    />
    <customNavbar
      :class="[
        {
          customNavbar__fixed: layoutInfo.scrollTop > 0,
        },
        navbarClass,
      ]"
      :style="[navbarStyle]"
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
    <loginPopup />
    <notify v-if="useNotify">
      <slot name="notify"></slot>
    </notify>
    <modal v-if="useModal">
      <slot name="modal">{{ modalProps.content }}</slot>
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
      v-for="key in [
        'CoPageView_bottom_placeholder',
        'CoPageView_bottom bg-jun-bg',
      ]"
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
    z-index: 2;
  }
  .CoPageView_bottom_placeholder {
    opacity: 0;
    visibility: hidden;
  }
}
.customNavbar__fixed {
  @apply \!bg-jun-bg \!c-jun-c \!bg-none;
}
</style>
