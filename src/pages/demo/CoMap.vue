<cfg lang="json">
{
  "navigationBarTitleText": "地图",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { CoMapMapProps } from "@/components/common/CoMap/CoMap.vue";
import { onPageScroll } from "@dcloudio/uni-app";

const mapProps = computed(() => {
  const props: CoMapMapProps = {};
  return props
});
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
      <view class="C-T3">建议使用微信小程序查看</view>
      <CoMap :mapProps="mapProps" style="height: 300px;"></CoMap>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
