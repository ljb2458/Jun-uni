<route lang="json">
{
  "navigationBarTitleText": "列表",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

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
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="mt-lg text-lg">基本使用</view>
      <view class="c-jun-c-2"
        >如非特殊需要，建议使用 CoRequestList 组件，CoRequestList
        基于该组件二次开发，功能十分强大！</view
      >
      <CoList :status="status" @load="load">
        <view
          class="flex items-center gap-sm text-sm mt-lg p-lg bg-jun-bg rd-md anim-rightToLeft"
          v-for="item in list"
          :key="item.random"
        >
          <view class="text-xxl c-jun-primary">
            P<text class="text-sm">{{ item.pageNo }}</text>
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
