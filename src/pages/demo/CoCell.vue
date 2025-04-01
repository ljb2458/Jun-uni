<cfg lang="json">
{
  "navigationBarTitleText": "单元格",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="demoPage B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg MB-sm">基本使用</view>
      <CoCell leftIcon="cicon-dingwei" leftText="定位" rightText="更多" />
      <CoCell leftIcon="cicon-shaixuan" leftText="筛选" rightText="去吧" />

      <view class="F-S-lg MB-sm MT-md">带边框的用法</view>
      <CoCell leftText="收藏" rightText="查看全部" mode="border" />
      <CoCell leftText="喜欢" rightText="查看更多" mode="border" />

      <view class="F-S-lg MB-sm MT-md">带阴影的用法</view>
      <CoCell leftText="通知" rightText="查看详情" shadow bg="var(--C-B2)" />
      <CoCell leftText="消息" rightText="查看全部" shadow bg="var(--C-B2)" />

      <view class="F-S-lg MB-sm MT-md">自定义右侧图标</view>
      <CoCell leftText="设置" rightIcon="cicon-fuzhi" bg="var(--C-B1)" />
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
