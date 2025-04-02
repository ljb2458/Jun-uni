<cfg lang="json">
{
  "navigationBarTitleText": "列表状态",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
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
