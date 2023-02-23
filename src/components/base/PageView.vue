<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-02-23 21:11:35
 * @FilePath: /my-vue3-project/src/components/base/PageView.vue
 * 介绍:
-->
<script lang="ts" setup>
const porps = defineProps<{
  /**使用下拉刷新 */
  usePullDown?: boolean;
}>();
const emit = defineEmits<{
  (e: "resize", v: any): void;
  (e: "scroll", v: any): void;
  (e: "scrolldone", v: any): void;
}>();
const rootFontSize = uni.upx2px(1) + "px";
</script>

<template>
  <page-meta
    :root-font-size="rootFontSize"
    :enable-pull-down-refresh="porps.usePullDown || false"
    @resize="(e:any)=>emit('resize',e)"
    @scroll="(e:any)=>emit('scroll',e)"
    @scrolldone="(e:any)=>emit('scrolldone',e)"
    class="PageView"
  >
    <slot></slot>
  </page-meta>
</template>

<style lang="scss" scoped>
.PageView {
  display: block !important;
}
</style>
