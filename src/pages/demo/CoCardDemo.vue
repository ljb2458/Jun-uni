<cfg lang="json">
{
  "navigationBarTitleText": "卡片",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="loginPage PB-md C-white" :onPageScroll="onPageScroll">
    <CoCard class="B-B1 R-sm MG-md C-T1">
      <view class="flex-A-C flex-J-C F-S-xl" style="height: 250px">
        基本使用
      </view>
    </CoCard>
    <CoCard
      :bg-img="_import('@/static/components/imgs/error.svg')"
      class="B-B1 R-sm MG-md C-black"
    >
      <view class="flex-A-C flex-J-C F-S-xl z-I-2" style="height: 250px">
        <view class="T-A-C">
          使用图片背景
          <view class="F-S-sm">非必要不推荐使用，需要设置z-index</view>
        </view>
      </view>
    </CoCard>
    <CoCard
      bgboxBlur="8px"
      bgboxClass="PD-sm"
      class="loginCard B-B1-O3 R-sm MG-md PD-md"
    >
      <template #bgbox>
        <view class="colorbox flex-J-SB"></view>
      </template>
      <view class="z-I-2">
        <view class="flex-J-C flex-A-C F-S-xl" style="height: 250px">
          模糊卡片示例
        </view>
      </view>
    </CoCard>
  </CoPageView>
</template>

<style lang="scss" scoped>
.CoPageView {
  background-image: linear-gradient(135deg, #feb692, #ea5455);

  .colorbox {
    @keyframes translate {
      0% {
        transform: scale(0.9) translateY(30px);
      }

      100% {
        transform: scale(1) translateY(-10px);
      }
    }
    animation: translate linear 2s infinite alternate-reverse;
    &::after {
      display: block;
      content: "";
      width: 80px;
      height: 80px;
      border-radius: var(--R-max);

      background-image: linear-gradient(135deg, #fce38a, #f38181);
      transform: translate(30%, 50%);
    }
    &::before {
      display: block;
      content: "";
      width: 100px;
      height: 100px;
      border-radius: var(--R-max);
      transform: translate(-30%, 100%);

      background-image: linear-gradient(135deg, #feb692, #ea5455);
    }
  }
}
</style>
