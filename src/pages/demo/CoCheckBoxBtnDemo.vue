<cfg lang="json">
{
  "navigationBarTitleText": "复选按钮 | 单选按钮",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

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
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <!-- 多选模式 -->
      <view class="F-S-lg MT-md MB-sm">多选模式</view>
      <view class="flex-A-C gap-sm">
        <CoCheckBoxBtn
          v-for="option in options"
          :key="option.value"
          v-model="selectedValues"
          :value="option.value"
          :activeClass="'B-B1'"
          :normalClass="'B-success C-white'"
          class="R-sm"
        >
          <view class="PD-sm">{{ option.label }}</view>
        </CoCheckBoxBtn>
      </view>
      <view class="F-S-sm C-T3 MT-xs">已选值：{{ selectedValues }}</view>

      <!-- 单选模式 -->
      <view class="F-S-lg MT-md MB-sm">单选模式</view>
      <view class="flex-A-C gap-sm">
        <CoCheckBoxBtn
          v-for="option in radioOptions"
          :key="option.value"
          v-model="selectedValue"
          :value="option.value"
          isRadio
          :normal-class="'B-B1'"
          class="R-sm"
        >
          <view class="PD-sm">{{ option.label }}</view>
        </CoCheckBoxBtn>
      </view>
      <view class="F-S-sm C-T3 MT-xs">已选值：{{ selectedValue }}</view>

      <!-- 可取消选择示例 -->
      <view class="F-S-lg MT-md MB-sm">不可取消选择</view>
      <view class="flex-A-C gap-sm">
        <CoCheckBoxBtn
          v-model="selectedValue"
          value="X"
          isRadio
          :normal-class="'B-B1'"
          :disabledCancel="true"
          class="R-sm"
        >
          <view class="PD-sm">不可取消选项 X</view>
        </CoCheckBoxBtn>
      </view>
      <view class="F-S-sm C-T3 MT-xs">已选值：{{ selectedValue }}</view>

      <!-- 可禁用示例 -->
      <view class="F-S-lg MT-md MB-sm">禁用</view>
      <view class="flex-A-C gap-sm">
        <CoCheckBoxBtn
          v-model="selectedValues"
          value="A"
          :activeClass="'B-B1'"
          :normalClass="'B-success C-white'"
          :disabled="true"
          class="R-sm"
        >
          <view class="PD-sm">禁用选项 A</view>
        </CoCheckBoxBtn>
      </view>
      <view class="F-S-sm C-T3 MT-xs">已选值：{{ selectedValues }}</view>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
