<route lang="json">
{
  "navigationBarTitleText": "粘性布局",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg" style="height: 200vh">
      <view class="text-lg mt-lg mb-1">基本示例</view>
      <CoSticky offsetTop="0px" class="bg-jun-bg-1 p-2.2">
        向上滑动页面，我将固定在导航栏下方
      </CoSticky>
      <view class="text-lg mt-lg mb-1">禁用</view>
      <CoSticky offsetTop="0px" disabled class="bg-jun-bg-1 p-2.2">
        向上滑动页面，我的固定功能将失效
      </CoSticky>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
