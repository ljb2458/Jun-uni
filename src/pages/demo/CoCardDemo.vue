<route lang="json">
{
  "navigationBarTitleText": "卡片",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="loginPage pb-lg c-white" :onPageScroll="onPageScroll">
    <CoCard class="bg-jun-bg rd-md m-lg c-jun-c">
      <view
        class="flex items-center flex justify-center text-xl"
        style="height: 250px"
      >
        基本使用
      </view>
    </CoCard>
    <CoCard
      :bg-img="_import('@/static/components/imgs/error.svg')"
      class="bg-jun-bg rd-md m-lg c-black"
    >
      <view
        class="flex items-center flex justify-center text-xl z-2"
        style="height: 250px"
      >
        <view class="T-A-C">
          使用图片背景
          <view class="text-sm">非必要不推荐使用，需要设置z-index</view>
        </view>
      </view>
    </CoCard>
    <CoCard
      bgboxBlur="8px"
      bgboxClass="p-2.2"
      class="loginCard bg-jun-bg c-op-30 rd-md m-lg p-sm"
    >
      <template #bgbox>
        <view class="colorbox flex justify-between"></view>
      </template>
      <view class="z-2">
        <view
          class="flex justify-center flex items-center text-xl"
          style="height: 250px"
        >
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
      border-radius: var(--rd-9999999px);

      background-image: linear-gradient(135deg, #fce38a, #f38181);
      transform: translate(30%, 50%);
    }
    &::before {
      display: block;
      content: "";
      width: 100px;
      height: 100px;
      border-radius: var(--rd-9999999px);
      transform: translate(-30%, 100%);

      background-image: linear-gradient(135deg, #feb692, #ea5455);
    }
  }
}
</style>
