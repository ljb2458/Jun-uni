<cfg lang="json">
{
  "navigationBarTitleText": "地图",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

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
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
      <view class="C-T3 MB-xs">使用微信小程序和 APP 查看</view>
      <CoMap :mapProps="mapProps" style="height: 300px">
        <template #callout="{ markers }">
          <cover-view
            style="width: 60vw"
            class="flex-A-STR B-B1 R-sm"
            v-for="item in markers"
            :key="item.id"
            :marker-id="item.id"
          >
            <cover-view class="flex-1 PD-xs">
              {{ item.address }}
            </cover-view>
            <cover-view class="flex-J-C flex-A-C PD-xs B-M1 C-white">
              <cover-view>导航</cover-view>
            </cover-view>
          </cover-view>
        </template>
      </CoMap>

      <view class="MT-md MB-xs F-S-lg">自定义图标与插槽</view>
      <CoMap
        :left-cotrols="controls"
        :right-cotrols="controls"
        :mapProps="mapProps"
        style="height: 300px"
        topHeight="100px"
        bottomHeight="300px"
      >
        <template #top>
          <cover-view class="B-B1 PD-sm">
            <cover-view style="height: var(--status-bar-height)"> </cover-view>
            <cover-view> 全屏后可见，顶部插槽 </cover-view>
          </cover-view>
        </template>
        <template #bottom>
          <cover-view class="B-B1 PD-sm size-fill">
            全屏后可见，底部插槽
          </cover-view>
        </template>
        <template #callout="{ markers }">
          <cover-view
            style="width: 60vw"
            class="flex-A-STR B-B1 R-sm"
            v-for="item in markers"
            :key="item.id"
            :marker-id="item.id"
          >
            <cover-view class="flex-1 PD-xs">
              {{ item.address }}
            </cover-view>
            <cover-view class="flex-J-C flex-A-C PD-xs B-M1 C-white">
              <cover-view>导航</cover-view>
            </cover-view>
          </cover-view>
        </template>
      </CoMap>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
