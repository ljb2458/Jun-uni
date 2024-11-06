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
@import "@/package/style/effects.scss";
@import "@/package/style/text.scss";
@import "@/package/style/box.scss";
@import "@/package/style/layout.scss";
@import "@/package/style/color.scss";
@import "@/package/style/init.scss";
@import "@/package/style/resetUview.scss";
</style>
