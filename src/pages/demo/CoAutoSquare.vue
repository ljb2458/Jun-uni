<cfg lang="json">
{
  "navigationBarTitleText": "自动正方形",
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
    <view class="demo-container PD-md">
      <view class="T-A-C F-S-lg T-strong MB-md">自动正方形组件 Demo</view>

      <!-- 默认正方形 -->
      <view class="demo-section MB-lg">
        <view class="T-A-C F-S-md T-strong MB-sm">默认正方形</view>
        <CoAutoSquare class="square-box border-all">
          <view class="content flex flex-A-C flex-J-C C-T2">
            这是一个正方形
          </view>
        </CoAutoSquare>
      </view>

      <!-- 长方形 -->
      <view class="demo-section">
        <view class="T-A-C F-S-md T-strong MB-sm"
          >长方形（高度比例为 0.5）</view
        >
        <CoAutoSquare :heightScale="0.5" class="rectangle-box border-all">
          <view class="content flex flex-A-C flex-J-C C-T2">
            这是一个长方形
          </view>
        </CoAutoSquare>
      </view>

      <!-- Grid 布局中的效果 -->
      <view class="demo-section">
        <view class="T-A-C F-S-md T-strong MB-sm">Grid 布局中的效果</view>
        <view class="grid-container gap-sm">
          <CoAutoSquare v-for="i in 4" :key="i" class="border-all">
            <view class="content flex flex-A-C flex-J-C C-T2">
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
  background-color: var(--C-B2);
}

.content {
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
