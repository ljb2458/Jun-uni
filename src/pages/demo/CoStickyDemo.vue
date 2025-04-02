<cfg lang="json">
{
  "navigationBarTitleText": "粘性布局",
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
    <view class="PD-md" style="height: 200vh">
      <view class="F-S-lg MT-md MB-xs">基本示例</view>
      <CoSticky offsetTop="0px" class="B-B2 PD-sm">
        向上滑动页面，我将固定在导航栏下方
      </CoSticky>
      <view class="F-S-lg MT-md MB-xs">禁用</view>
      <CoSticky offsetTop="0px" disabled class="B-B2 PD-sm">
        向上滑动页面，我的固定功能将失效
      </CoSticky>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
