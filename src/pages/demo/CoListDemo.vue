<cfg lang="json">
{
  "navigationBarTitleText": "列表",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { StateType } from "@/components/common/CoListStatus/CoListStatus.vue";
import { randomUUID } from "@/utils/tools/generate";

const list = ref<ApiResItem[]>([]);
const status = ref<StateType>("next");

interface ApiResItem {
  pageNo: number;
  random: string;
}
let pageNo = 1;
async function load() {
  const _list: ApiResItem[] = [];
  for (let i = 0; i < 10; i++) {
    _list.push({
      pageNo,
      random: randomUUID(),
    });
  }
  pageNo++;
  status.value = "loading";
  await new Promise((reslove) => setTimeout(reslove, 1000));
  status.value = "next";
  if (pageNo > 2) status.value = "end";
  list.value.push(..._list);
}
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
      <view class="C-T3"
        >如非特殊需要，建议使用 CoRequestList 组件，CoRequestList
        基于该组件二次开发，功能十分强大！</view
      >
      <CoList :status="status" @load="load">
        <view
          class="flex-A-C gap-sm F-S-sm MT-md PD-md B-B1 R-sm anim-rightToLeft"
          v-for="item in list"
          :key="item.random"
        >
          <view class="F-S-xxl C-M1">
            P<text class="F-S-sm">{{ item.pageNo }}</text>
          </view>
          <view>
            <view class="T-break">{{ item.random }}</view>
          </view>
        </view>
      </CoList>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
