<cfg lang="json">
{
  "navigationBarTitleText": "webview",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const webviewData = ref({
  name: "你好",
});
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg">示例暂缺</view>
      <view class="C-T3">
        在官方 webview 的基础上，通过url携带哈希字符串与 @message
        的方式实现了一个v-model，示例暂缺。
      </view>
      <!-- <CoWebView src="#" v-model="webviewData" /> -->
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
