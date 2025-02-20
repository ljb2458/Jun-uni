<script setup lang="ts">
import "@/static/iconfont/cicon/iconfont.css";
import "@/static/iconfont/icon/iconfont.css";

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
@import "@/styles/atomization/index.scss";

@import "@climblee/uv-ui/index.scss";
</style>
