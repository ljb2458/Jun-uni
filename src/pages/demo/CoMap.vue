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
  const latitude = 39.909;
  const longitude = 116.39742;
  const address = "北京市天安门广场内";
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
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
      <view class="C-T3 MB-xs">建议使用微信小程序查看</view>
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
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
