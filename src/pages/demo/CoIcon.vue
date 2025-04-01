<cfg lang="json">
{
  "navigationBarTitleText": "iconfont图标",
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
    <view class="PD-md">
      <view class="F-S-lg MT-md">基本使用</view>
      <view class="MB-xs C-T3">
        打开 iconfont 官网
        选择图标加入购物车并添加到项目。在项目管理中选中项目，选择Font class
        并选择下载至本地，在App.vue中引入字体图标文件。最后使用该组件展示图标</view
      >
      <CoIcon name="cicon-fuzhi" size="24px" color="red" />
      <CoIcon name="cicon-shaixuan" size="24px" color="green" />
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
