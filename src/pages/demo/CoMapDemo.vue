<route lang="json">
{
  "navigationBarTitleText": "地图",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import {
  CoMapCotrolsItem,
  CoMapMapProps,
} from "@/components/common/CoMap/CoMap.vue";
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";

const mapProps = computed(() => {
  const latitude = 39.909;
  const longitude = 116.39742;
  const address = "北京市东城区天安门广场内";
  function markertap(id: number) {
    if (id === 1) {
      uni.openLocation({
        latitude,
        longitude,
        name: address,
      });
    }
  }
  const props: CoMapMapProps = {
    latitude,
    longitude,
    markers: [
      {
        id: 1,
        latitude,
        longitude,
        address,
        customCallout: {
          display: "ALWAYS",
        },
      },
    ],
    onCallouttap(e) {
      markertap(e.detail.markerId);
    },
    onMarkertap(e) {
      markertap(e.detail.markerId);
    },
  };
  return props;
});

const controls: CoMapCotrolsItem[] = [
  {
    iconPath: _import("src/static/components/imgs/menu.png"),
    tap() {
      uni.showToast({ title: "点击了自定义图标" });
    },
    orderNo: 20,
  },
];
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="mt-lg text-lg">基本使用</view>
      <view class="c-jun-c-2 mb-1">使用微信小程序和 APP 查看</view>
      <!-- #ifdef APP -->
      <view class="c-jun-c-2 mb-1"
        >APP上 markers 图标 width height
        设置无效，使用图片工具更改图片尺寸</view
      >
      <!-- #endif -->

      <CoMap :mapProps="mapProps" style="height: 300px">
        <template #callout="{ markers }">
          <cover-view
            style="width: 60vw"
            class="flex items-stretch bg-jun-bg rd-md"
            v-for="item in markers"
            :key="item.id"
            :marker-id="item.id"
          >
            <cover-view class="flex flex-1 p-2">
              {{ item.address }}
            </cover-view>
            <cover-view class="flex justify-center flex items-center p-2 bg-jun-primary c-white">
              <cover-view>导航</cover-view>
            </cover-view>
          </cover-view>
        </template>
      </CoMap>

      <view class="mt-lg mb-1 text-lg">自定义图标与插槽</view>
      <!-- #ifdef APP -->
      <view class="c-jun-c-2 mb-1">APP上 不支持 callout 插槽</view>
      <!-- #endif -->
      <CoMap
        :left-cotrols="controls"
        :right-cotrols="controls"
        :mapProps="mapProps"
        style="height: 300px"
        topHeight="100px"
        bottomHeight="300px"
      >
        <template #top>
          <cover-view class="bg-jun-bg p-2.2">
            <cover-view style="height: var(--status-bar-height)"> </cover-view>
            <cover-view> 全屏后可见，顶部插槽 </cover-view>
          </cover-view>
        </template>
        <template #bottom>
          <cover-view class="bg-jun-bg p-2.2 size-full">
            全屏后可见，底部插槽
          </cover-view>
        </template>
        <template #callout="{ markers }">
          <cover-view
            style="width: 60vw"
            class="flex items-stretch bg-jun-bg rd-md"
            v-for="item in markers"
            :key="item.id"
            :marker-id="item.id"
          >
            <cover-view class="flex flex-1 p-2">
              {{ item.address }}
            </cover-view>
            <cover-view class="flex justify-center flex items-center p-2 bg-jun-primary c-white">
              <cover-view>导航</cover-view>
            </cover-view>
          </cover-view>
        </template>
      </CoMap>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
