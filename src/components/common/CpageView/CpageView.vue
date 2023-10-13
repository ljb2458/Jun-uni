<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-10-07 18:44:08
 * 介绍:
-->
<script lang="ts" setup>
import notify from "@/layout/notify.vue";
import modal from "@/layout/modal.vue";
import { config } from "@/layout/modal";
import customNavbar from "@/layout/customNavbar.vue";
import { getCurrentPage } from "@/hooks/rewriteUni";

const props = withDefaults(
  defineProps<{
    /**使用消息提示 */
    useNotify?: boolean;
    /**使用模态框 */
    useModal?: boolean;
    useSafetyTop?: boolean;
    useCustomNavbar?: boolean;
    title?: string;
    useSafetyBottom?: boolean;
  }>(),
  {
    useSafetyTop: true,
    useCustomNavbar: true,
    useNotify: true,
    useSafetyBottom: true,
  }
);
const page = getCurrentPage();
</script>

<template>
  <view class="CpageView">
    <view
      v-if="props.useSafetyTop && page.meta.navigationBar.style === 'custom'"
      class="CpageView_safetyTop"
    ></view>
    <customNavbar
      v-if="props.useCustomNavbar"
      :meta="page.meta"
      :title="title"
    />
    <notify v-if="useNotify"><slot name="notify"></slot></notify>
    <modal v-if="useModal">
      <slot name="modal">{{ config.content }}</slot>
    </modal>
    <slot></slot>
    <view v-if="props.useSafetyBottom" class="CpageView_safetyBottom"></view>
  </view>
</template>

<style lang="scss" scoped>
.CpageView {
  padding: var(--gap-md);
  min-height: calc(100vh - var(--window-top));
}
.CpageView_safetyTop {
  height: var(--status-bar-height);
}
.CpageView_safetyBottom {
  height: var(--window-bottom);
}
</style>
