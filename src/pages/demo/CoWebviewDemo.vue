<route lang="json">
{
  "navigationBarTitleText": "webview",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const webviewData = ref({
  name: "你好",
});
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="text-lg">示例暂缺</view>
      <view class="c-jun-c-2">
        在官方 webview 的基础上，通过url携带哈希字符串与 @message
        的方式实现了一个v-model，示例暂缺。
      </view>
      <!-- <CoWebView src="#" v-model="webviewData" /> -->
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
