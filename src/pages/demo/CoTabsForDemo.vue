<route lang="json">
{
  "navigationBarTitleText": "标签页",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { CoTabsForInstance } from "@/components/common/CoTabsFor/CoTabsFor.vue";
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";

const CoTabsForRef = ref<CoTabsForInstance>();

const tabsList = reactive([
  {
    name: "选项卡1",
  },
  {
    name: "选项卡2",
  },
]);
const currTab = ref(0);
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="p-lg">
      <view class="p-2.2">
        <view class="text-lg">CoTabsFor</view>
        <view class="c-jun-c-2 P-sm">
          适用多端的tabs组件，支持自动高度、懒加载、自动吸顶、滑动等功能。
        </view>
      </view>

      <CoTabsFor
        ref="CoTabsForRef"
        v-model="currTab"
        :sticky="true"
        sticky-class="bg-jun-bg-1 pb-2.2"
        :options="tabsList"
      >
        <template #title-top>
          <view class="text-center border-all"> 标题顶部插槽 </view>
        </template>
        <template #title-left>
          <view class="border-all" style="width: 2em"> 标题左侧插槽 </view>
        </template>
        <template #title-right>
          <view class="border-all" style="width: 2em"> 标题右侧插槽 </view>
        </template>
        <template #title-bottom>
          <view class="text-center border-all"> 标题底部插槽 </view>
          <text class="text-lg mt-lg">控制切换选项卡</text>
          <CoSelect
            class="mt-2 bg-jun-bg border-none"
            v-model="currTab"
            :selections="tabsList.map((v, i) => ({ label: v.name, value: i }))"
          />
        </template>
        <template #default="{ option }">
          <view
            class="bg-jun-bg mt-lg p-lg rd-md"
            v-for="item in (option.index + 1) * 100"
          >
            <view>
              {{ option.name }}
            </view>
            <view>
              {{ item }}
            </view>
          </view>
        </template>
      </CoTabsFor>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
