<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
<script lang="ts" setup>
import notify from "@/layout/notify.vue";
import modal from "@/layout/modal.vue";
import { config } from "@/layout/setModal";
import customNavbar from "@/layout/customNavbar.vue";
import { onPageScroll } from "@dcloudio/uni-app";

const props = withDefaults(
  defineProps<{
    /**使用消息提示 */
    useNotify?: boolean;
    /**使用模态框 */
    useModal?: boolean;
    useSafetyTop?: boolean;
    useCustomNavbar?: boolean;
    useSafetyBottom?: boolean;
    onPageScroll?: typeof onPageScroll;
    bgImg?: string;
  }>(),
  {
    useSafetyTop: true,
    useCustomNavbar: true,
    useNotify: true,
    useSafetyBottom: true,
  }
);
const layoutInfo = reactive({
  scrollTop: 0,
});
if (props.onPageScroll)
  props.onPageScroll((e) => {
    layoutInfo.scrollTop = e.scrollTop;
  });
</script>

<template>
  <view class="CoPageView">
    <ReImage
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
      <template v-if="$slots.customNavbar" #default="{ slotProps }">
        <slot :slotProps="slotProps" name="customNavbar"></slot>
      </template>
    </customNavbar>
    <notify v-if="useNotify">
      <slot name="notify"></slot>
    </notify>
    <modal v-if="useModal">
      <slot name="modal">{{ config.content }}</slot>
    </modal>
    <slot></slot>
    <view
      v-if="props.useSafetyBottom"
      style="height: var(--window-bottom)"
    ></view>
  </view>
</template>

<style lang="scss" scoped>
.CoPageView {
  min-height: calc(100vh - var(--window-top));
  position: relative;
  .CoPageView__bgImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -1;
  }
}
.customNavbar__fixed {
  background: var(--C-B1);
  color: var(--C-T1);
}
</style>
