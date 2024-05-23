<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-10-13 18:47:51
 * 介绍:
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
// #ifdef APP-PLUS
plus.screen.lockOrientation("portrait-primary");
// #endif
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "uview-plus/index.scss";
@import "@/common/css/effects.scss";
@import "@/common/css/text.scss";
@import "@/common/css/layout.scss";
@import "@/common/css/color.scss";
@import "@/common/css/init.scss";
@import "@/common/css/resetUview.scss";
</style>
