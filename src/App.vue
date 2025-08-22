<script setup lang="ts">
import "@/static/iconfont/cicon/iconfont.css";
import "@/static/iconfont/icon/iconfont.css";
import { setupAppInit } from "./init";
//App加载后初始化
setupAppInit()


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
//(uv-ui 样式)
@import "@climblee/uv-ui/index.scss";
@import "@/styles/atomization/index.scss";
@import "@/styles/uv-ui-reset/index.scss";
</style>
