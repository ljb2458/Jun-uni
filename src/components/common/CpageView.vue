<!--
 * @Date: 2023-02-21 22:32:00
 * @LastEditTime: 2023-03-04 16:44:51
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

function on_resize(e: ResizeEvent) {
  emit("resize", e);
}
interface ResizeEvent {
  /**landscape横屏  portrait竖屏*/
  deviceOrientation: "portrait" | "landscape";
  size: {
    /**视窗宽度 */
    windowWidth: number;
    /**视窗高度 */
    windowHeight: number;
    /**平面宽度 */
    screenWidth: number;
    /**平面高度 */
    screenHeight: number;
  };
}
</script>

<template>
  <page-meta
    :enable-pull-down-refresh="porps.usePullDown || false"
    @resize="on_resize"
    @scroll="(e:any)=>emit('scroll',e)"
    @scrolldone="(e:any)=>emit('scrolldone',e)"
    class="CpageView"
  >
    <slot></slot>
  </page-meta>
</template>

<style lang="scss" scoped>
.CpageView {
  display: block !important;
}
</style>
