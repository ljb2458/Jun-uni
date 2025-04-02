<cfg lang="json">
{
  "navigationBarTitleText": "下拉选择",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";

// 下拉选择的数据
const selections = ref([
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 },
  { label: "选项3", value: 3 },
  { label: "选项4", value: 4 },
]);

// 当前选中的值
const selectedValue = ref<number>();
</script>

<template>
  <CoPageView class="demoPage B-B2 PB-md" :onPageScroll="onPageScroll">
    <!-- 下拉选择示例 -->
    <view class="MT-md T-A-C F-S-lg">基本示例</view>
    <view class="flex-col PD-md">
      <CoSelect
        v-model="selectedValue"
        :selections="selections"
      >
        <template #value="{ selectedOption }">
          <view v-if="selectedOption">
            已选择：{{ selectedOption.label }}
          </view>
          <view v-else>请选择</view>
        </template>
      </CoSelect>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
