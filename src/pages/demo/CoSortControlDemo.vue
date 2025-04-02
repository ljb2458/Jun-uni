<cfg lang="json">
{
  "navigationBarTitleText": "排序控件",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const keyName1 = ref("");
const value1 = ref("");

const keyName2 = ref("");
const value2 = ref("");
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md MB-xs F-S-lg">基本示例</view>
      <view class="C-T3">该组件业务味较重，后续可能修改，不建议使用。</view>
      <view class="flex gap-sm flex-wrap">
        <CoSortControl
          class="P-row-sm P-col-xs B-B1 R-sm active"
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

      <view class="MT-md MB-xs F-S-lg">可多个</view>
      <view class="flex gap-sm flex-wrap">
        <CoSortControl
          class="P-row-sm P-col-xs B-B1 R-sm active"
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
