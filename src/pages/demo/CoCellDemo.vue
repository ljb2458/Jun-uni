<route lang="json">
{
  "navigationBarTitleText": "单元格",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="demoPage bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="text-lg mb-2">基本使用</view>
      <CoCell leftIcon="cicon-dingwei" leftText="定位" rightText="更多" />
      <CoCell leftIcon="cicon-shaixuan" leftText="筛选" rightText="去吧" />

      <view class="text-lg mb-2 mt-lg">带边框的用法</view>
      <CoCell leftText="收藏" rightText="查看全部" mode="border" />
      <CoCell leftText="喜欢" rightText="查看更多" mode="border" />

      <view class="text-lg mb-2 mt-lg">带阴影的用法</view>
      <CoCell leftText="通知" rightText="查看详情" shadow bg="var(--c-jun-bg-1)" />
      <CoCell leftText="消息" rightText="查看全部" shadow bg="var(--c-jun-bg-1)" />

      <view class="text-lg mb-2 mt-lg">自定义右侧图标</view>
      <CoCell leftText="设置" rightIcon="cicon-fuzhi" bg="var(--c-jun-bg)" />
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped>
.demoPage {
  .CoCell {
    margin-bottom: var(--gap-sm);
  }
}
</style>
