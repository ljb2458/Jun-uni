<route lang="json">
{
  "navigationBarTitleText": "分割线",
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
      <view class="text-lg mt-lg mb-1">基本使用</view>
      <CoDivider />
      <view class="text-lg mt-lg mb-1">渐变线</view>
      <CoDivider bg="var(--C-LG1)" height="6px" />
      <view class="text-lg mt-lg mb-1">竖线</view>
      <CoDivider height="100px" width="1px" />      
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
