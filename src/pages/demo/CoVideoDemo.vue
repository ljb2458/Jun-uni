<cfg lang="json">
{
  "navigationBarTitleText": "视频",
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
      <view class="F-S-lg">基础示例</view>
      <view class="C-T3"
        >在官方 video
        的基础上增加了一个播放倍率，目前功能太少，暂不推荐使用</view
      >
      <CoVideo
        src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
      />
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
