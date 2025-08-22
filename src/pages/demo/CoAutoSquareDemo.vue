<route lang="json">
{
  "navigationBarTitleText": "自动正方形",
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
    <view class="demo-container p-lg">
      <view class="text-center text-lg font-bold mb-lg">自动正方形组件 Demo</view>
      <view class="c-jun-c-2">该组件的高度随宽度变化而变化</view>
      <!-- 默认正方形 -->
      <view class="demo-section mb-lg">
        <view class="text-center text-sm font-bold mb-2 mt-2.2">默认正方形</view>
        <CoAutoSquare class="square-box border-all">
          <view class="content flex flex items-center flex justify-center c-jun-c-1">
            这是一个正方形
          </view>
        </CoAutoSquare>
      </view>

      <!-- 长方形 -->
      <view class="demo-section">
        <view class="text-center text-sm font-bold mb-2"
          >长方形（高度比例为 0.5）</view
        >
        <CoAutoSquare :heightScale="0.5" class="rectangle-box border-all">
          <view class="content flex flex items-center flex justify-center c-jun-c-1">
            这是一个长方形
          </view>
        </CoAutoSquare>
      </view>

      <!-- Grid 布局中的效果 -->
      <view class="demo-section">
        <view class="text-center text-sm font-bold mb-2">Grid 布局中的效果</view>
        <view class="grid-container gap-sm">
          <CoAutoSquare v-for="i in 4" :key="i" class="border-all">
            <view class="content flex flex items-center flex justify-center c-jun-c-1">
              网格项 {{ i }}
            </view>
          </CoAutoSquare>
        </view>
      </view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped>
.demo-container {
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 30px;
}

.square-box,
.rectangle-box {
  background-color: var(--c-jun-bg-1);
}

.content {
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
