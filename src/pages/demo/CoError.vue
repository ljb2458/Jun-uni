<cfg lang="json">
{
  "navigationBarTitleText": "错误",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";

function reload() {
  uni.showToast({ title: "重新加载" });
}
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg MT-md MB-xs">基本使用</view>
      <CoError @tap="reload" message="出错了" />
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
