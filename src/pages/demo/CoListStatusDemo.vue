<route lang="json">
{
  "navigationBarTitleText": "列表状态",
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
    <view class="p-lg">
      <view class="mt-lg text-lg">基本使用</view>
      <CoListStatus :type="'next'" message="继续加载"/>
      <CoListStatus :type="'loading'" message="加载中"/>
      <CoListStatus :type="'end'" message="没有更多了"/>
      <CoListStatus :type="'null'" message="列表是空的"/>
      <CoListStatus :type="'error'" message="出错啦"/>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped>
</style>
