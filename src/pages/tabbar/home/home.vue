<cfg lang="json">
{
  "navigationBarTitleText": "首页",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}
</cfg>

<script setup lang="ts">
import { _require } from "@/utils/tools";
import { onPageScroll } from "@dcloudio/uni-app";

const swiperArray = [
  _require("src/static/imgs/bg/home_card_1.png"),
  _require("src/static/imgs/bg/home_card_2.png"),
  _require("src/static/imgs/bg/home_card_3.png"),
];
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <uv-swiper
      class="MT-md"
      :list="swiperArray"
      previousMargin="30"
      nextMargin="30"
      circular
      indicator
      radius="5"
    >
    </uv-swiper>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
