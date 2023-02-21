<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-02-21 21:11:20
 * @FilePath: /my-vue3-project/src/App.vue
 * 介绍:
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
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
@import "@@/common/common.scss";
@import "@@/common/init.css";
@import "@@/common/var.css";
@import "@@/common/reset.scss";
</style>
