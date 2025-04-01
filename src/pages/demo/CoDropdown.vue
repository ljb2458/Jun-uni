<cfg lang="json">
{
  "navigationBarTitleText": "下拉菜单",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const show = ref(false);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg MT-md MB-xs">基本使用</view>
      <CoDropdown text="点我展开" class="B-B1 PD-sm R-sm flex-J-SB">
        <view class="PD-sm">
          我是展开后你能看到的内容，怎么样你看到我了吗？</view
        >
      </CoDropdown>
      <view class="F-S-lg MT-md MB-xs">控制展开</view>
      <CoDropdown
        v-model:show="show"
        text="别点我，点下面的按钮控制我"
        class="B-B1 PD-sm R-sm flex-J-SB"
      >
        <view class="PD-sm">
          我是展开后你能看到的内容，怎么样你看到我了吗？</view
        >
      </CoDropdown>
      <uv-button class="MT-sm" :type="'primary'" @tap="show = true"
        >展开下拉菜单</uv-button
      >
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
