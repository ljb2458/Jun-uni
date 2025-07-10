<route lang="json">
{
  "navigationBarTitleText": "复选按钮 | 单选按钮",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const selectedValues = ref([]);
const selectedValue = ref(null);
const options = [
  { label: "选项 A", value: "A" },
  { label: "选项 B", value: "B" },
  { label: "选项 C", value: "C" },
];

const radioOptions = [
  { label: "选项 X", value: "X" },
  { label: "选项 Y", value: "Y" },
  { label: "选项 Z", value: "Z" },
];
</script>
<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <!-- 多选模式 -->
      <view class="text-lg mt-lg mb-2">多选模式</view>
      <view class="flex items-center gap-sm">
        <CoCheckBoxBtn
          v-for="option in options"
          :key="option.value"
          v-model="selectedValues"
          :value="option.value"
          :activeClass="'bg-jun-bg'"
          :normalClass="'bg-jun-success c-white'"
          class="rd-md"
        >
          <view class="p-2.2">{{ option.label }}</view>
        </CoCheckBoxBtn>
      </view>
      <view class="text-sm c-jun-c-2 mt-2">已选值：{{ selectedValues }}</view>

      <!-- 单选模式 -->
      <view class="text-lg mt-lg mb-2">单选模式</view>
      <view class="flex items-center gap-sm">
        <CoCheckBoxBtn
          v-for="option in radioOptions"
          :key="option.value"
          v-model="selectedValue"
          :value="option.value"
          isRadio
          :normal-class="'bg-jun-bg'"
          class="rd-md"
        >
          <view class="p-2.2">{{ option.label }}</view>
        </CoCheckBoxBtn>
      </view>
      <view class="text-sm c-jun-c-2 mt-2">已选值：{{ selectedValue }}</view>

      <!-- 可取消选择示例 -->
      <view class="text-lg mt-lg mb-2">不可取消选择</view>
      <view class="flex items-center gap-sm">
        <CoCheckBoxBtn
          v-model="selectedValue"
          value="X"
          isRadio
          :normal-class="'bg-jun-bg'"
          :disabledCancel="true"
          class="rd-md"
        >
          <view class="p-2.2">不可取消选项 X</view>
        </CoCheckBoxBtn>
      </view>
      <view class="text-sm c-jun-c-2 mt-2">已选值：{{ selectedValue }}</view>

      <!-- 可禁用示例 -->
      <view class="text-lg mt-lg mb-2">禁用</view>
      <view class="flex items-center gap-sm">
        <CoCheckBoxBtn
          v-model="selectedValues"
          value="A"
          :activeClass="'bg-jun-bg'"
          :normalClass="'bg-jun-success c-white'"
          :disabled="true"
          class="rd-md"
        >
          <view class="p-2.2">禁用选项 A</view>
        </CoCheckBoxBtn>
      </view>
      <view class="text-sm c-jun-c-2 mt-2">已选值：{{ selectedValues }}</view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
