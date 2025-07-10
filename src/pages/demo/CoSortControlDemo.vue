<route lang="json">
{
  "navigationBarTitleText": "排序控件",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const keyName1 = ref("");
const value1 = ref("");

const keyName2 = ref("");
const value2 = ref("");
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="mt-lg mb-1 text-lg">基本示例</view>
      <view class="c-jun-c-2">该组件业务味较重，后续可能修改，不建议使用。</view>
      <view class="flex gap-sm flex flex-wrap">
        <CoSortControl
          class="px-2.2 py-2 bg-jun-bg rd-md active"
          v-for="name in ['createTime', 'viewCount', 'pageCount']"
          :name="name"
          :key="name"
          v-model:field="keyName1"
          v-model:order="value1"
        >
          {{ name }}
        </CoSortControl>
      </view>
      <view> 排序字段：{{ keyName1 }} </view>
      <view> 排序方式：{{ value1 }} </view>

      <view class="mt-lg mb-1 text-lg">可多个</view>
      <view class="flex gap-sm flex flex-wrap">
        <CoSortControl
          class="px-2.2 py-2 bg-jun-bg rd-md active"
          v-for="name in ['createTime', 'viewCount', 'pageCount']"
          :name="name"
          :key="name"
          v-model:field="keyName2"
          v-model:order="value2"
          multiple
        >
          {{ name }}
        </CoSortControl>
      </view>
      <view> 排序字段：{{ keyName2 }} </view>
      <view> 排序方式：{{ value2 }} </view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
