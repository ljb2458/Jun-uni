<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-06-15 17:06:48
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
@import "@@/common/css/effects.scss";
@import "@@/common/css/text.scss";
@import "@@/common/css/layout.scss";
@import "@@/common/css/transition.scss";
@import "@@/common/css/color.scss";
@import "@@/common/css/init.css";
@import "@@/common/css/var.css";
@import "@@/common/css/resetUview.scss";
</style>
