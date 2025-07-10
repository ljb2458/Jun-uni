<route lang="json">
{
  "navigationBarTitleText": "宫格布局",
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
      <CoGrid gap="var(--gap-sm)" col="3" repeat="1fr">
        <view class="border-all size-fill" v-for="num in 9"> {{ num }} </view>
      </CoGrid>

      <view class="text-lg mt-lg">合并单元格</view>
      <view class="mb-1 c-jun-c-2">设置 CoGridItem 的 col 属性</view>
      <CoGrid gap="var(--gap-sm)" col="3" repeat="1fr">
        <CoGridItem col="0 / span 1" class="border-all size-fill">
          占用两格
        </CoGridItem>
        <CoGridItem class="border-all size-fill" v-for="num in 7">
          {{ num }}
        </CoGridItem>
      </CoGrid>

      <view class="text-lg mt-lg">更大的网格间距</view>
      <view class="mb-1 c-jun-c-2">设置 CoGrid 的 gap 属性</view>
      <CoGrid gap="var(--gap-xxl)" col="3" repeat="1fr">
        <view class="border-all size-fill" v-for="num in 9"> {{ num }} </view>
      </CoGrid>

      <view class="text-lg mt-lg">搭配自动正方形</view>
      <view class="mb-1 c-jun-c-2">可以快速生成九宫格</view>
      <CoGrid gap="var(--gap-sm)" col="3" repeat="1fr">
        <CoAutoSquare class="border-all size-fill" v-for="num in 9">
          {{ num }}
        </CoAutoSquare>
      </CoGrid>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
