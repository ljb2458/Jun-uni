<route lang="json">
{
  "navigationBarTitleText": "echarts",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import hotspotClickStatistics from "./components/hotspotClickStatistics.vue";
import lookStatistics from "./components/lookStatistics.vue";
import { routerCheck } from "@/init";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

onShow(async () => {
  const verify = await routerCheck(`/${getCurrentRouteInfo()?.path}`, true);
  if (verify === false) return;
  console.log('验证登录，通过')
});
</script>

<template>
  <CoPageView class="bg-jun-bg-1" :onPageScroll="onPageScroll">
    <view class="p-sm">
      <view class="bg-jun-bg bg-op-70 rd-xl p-sm mt-sm">
        <view>
          <view class="h-1em w-1 bg-jun-primary inline-block mr-1 v--10%"></view>
          热点点击量统计
        </view>
        <hotspotClickStatistics />
      </view>
      <view class="bg-jun-bg bg-op-70 rd-xl p-sm mt-sm">
        <view>
          <view class="h-1em w-1 bg-jun-primary inline-block mr-1 v--10%"></view>
          访问量统计
        </view>
        <lookStatistics />
      </view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
