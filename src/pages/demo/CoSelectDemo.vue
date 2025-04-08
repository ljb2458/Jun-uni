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
  { label: "label (1)", name: "name (1)", value: 1 },
  { label: "label (2)", name: "name (2)", value: 2 },
  { label: "label (3)", name: "name (3)", value: 3 },
  { label: "label (4)", name: "name (4)", value: 4 },
]);

// 当前选中的值
const selectedValue1 = ref<number>();
const selectedValue2 = ref<number>();
const selectedValue3 = ref<string>();
</script>

<template>
  <CoPageView class="demoPage B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md MB-xs F-S-lg">基本示例</view>
      <CoSelect v-model="selectedValue1" :selections="selections"> </CoSelect>
      <view class="MG-col-xs"> 选中的value：{{ selectedValue1 }} </view>
      <view class="MT-md MB-xs F-S-lg">自定义插槽</view>
      <CoSelect v-model="selectedValue2" :selections="selections">
        <template #value="{ selection }">
          <view v-if="selection"> 已选择 {{ selection.label }} </view>
          <view v-else>请选择</view>
        </template>
        <template #selection="{ selection }">
          <view>label：{{ selection.label }}</view>
          <view>value：{{ selection.value }}</view>
          <view>自定义选项布局</view>
        </template>
        <template #extraSelection>
          <uv-loading-icon text="额外插槽" />
        </template>
      </CoSelect>
      <view class="MG-col-xs"> 选中的value：{{ selectedValue2 }} </view>
      <view class="MT-md MB-xs F-S-lg">自定义 label value</view>
      <CoSelect
        v-model="selectedValue3"
        :selections="selections"
        :labelName="'name'"
        :valueName="'label'"
      >
      </CoSelect>
      <view class="MG-col-xs"> 选中的value：{{ selectedValue3 }} </view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
