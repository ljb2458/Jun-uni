<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-06-15 14:14:22
 * @FilePath: /music-client/src/components/common/CpageView/CpageView.vue
 * 介绍:
-->
<script lang="ts" setup>
import notify from "@@/layout/notify.vue";
import modal from "@@/layout/modal.vue";
import { config } from "@@/layout/modal";
const props = withDefaults(
  defineProps<{
    /**使用消息提示 */
    useNotify?: boolean;
    /**使用模态框 */
    useModal?: boolean;
  }>(),
  {
    useNotify: true,
  }
);
</script>

<template>
  <view class="CpageView">
    <notify v-if="useNotify"><slot name="notify"></slot></notify>
    <modal v-if="useModal">
      <slot name="modal">{{ config.content }}</slot>
    </modal>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CpageView {
  padding: var(--gap-md);
}
</style>
