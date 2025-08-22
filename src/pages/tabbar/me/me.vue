<route lang="json">
{
  "navigationBarTitleText": "我的",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { routerCheck } from "@/init";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

onShow(async () => {
  const verify = await routerCheck(`/${getCurrentRouteInfo()?.path}`, true);
  if (verify === false) return;
  uni.startPullDownRefresh();
});
</script>

<template>
  <CoPageView class="bg-jun-bg-1" :onPageScroll="onPageScroll"> </CoPageView>
</template>

<style lang="scss" scoped></style>
