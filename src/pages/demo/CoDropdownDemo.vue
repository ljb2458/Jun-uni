<route lang="json">
{
  "navigationBarTitleText": "下拉菜单",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const show = ref(false);
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="text-lg mt-lg mb-1">基本使用</view>
      <CoDropdown text="点我展开" class="bg-jun-bg p-2.2 rd-md flex justify-between">
        <view class="p-2.2">
          我是展开后你能看到的内容，怎么样你看到我了吗？</view
        >
      </CoDropdown>
      <view class="text-lg mt-lg mb-1">控制展开</view>
      <CoDropdown
        v-model:show="show"
        text="别点我，点下面的按钮控制我"
        class="bg-jun-bg p-2.2 rd-md flex justify-between"
      >
        <view class="p-2.2">
          我是展开后你能看到的内容，怎么样你看到我了吗？</view
        >
      </CoDropdown>
      <uv-button class="mt-2.2" :type="'primary'" @tap="show = true"
        >展开下拉菜单</uv-button
      >
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
