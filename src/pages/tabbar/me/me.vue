<route lang="json">
{
  "navigationBarTitleText": "我的",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
</script>

<template>
  <CoPageView class="bg-jun-bg-1" :onPageScroll="onPageScroll"> </CoPageView>
</template>

<style lang="scss" scoped></style>
