<cfg lang="json">
{
  "navigationBarTitleText": "分割线",
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
      <view class="F-S-lg MT-md MB-xs">基本使用</view>
      <CoDivider />
      <view class="F-S-lg MT-md MB-xs">渐变线</view>
      <CoDivider bg="var(--C-LG1)" height="6px" />
      <view class="F-S-lg MT-md MB-xs">竖线</view>
      <CoDivider height="100px" width="1px" />      
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
