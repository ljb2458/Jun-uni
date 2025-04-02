<cfg lang="json">
{
  "navigationBarTitleText": "标签页",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

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
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="PD-sm">
        <view class="F-S-lg">CoTabsFor</view>
        <view class="C-T3 P-sm">
          适用多端的tabs组件，支持自动高度、懒加载、自动吸顶、滑动等功能。
        </view>
      </view>

      <CoTabsFor
        ref="CoTabsForRef"
        v-model="currTab"
        :sticky="true"
        sticky-class="B-B2 PB-sm"
        :options="tabsList"
      >
        <template #title-top>
          <view class="T-A-C border-all"> 标题顶部插槽 </view>
        </template>
        <template #title-left>
          <view class="border-all" style="width: 2em"> 标题左侧插槽 </view>
        </template>
        <template #title-right>
          <view class="border-all" style="width: 2em"> 标题右侧插槽 </view>
        </template>
        <template #title-bottom>
          <view class="T-A-C border-all"> 标题底部插槽 </view>
          <text class="F-S-lg MT-md">控制切换选项卡</text>
          <CoSelect
            class="MT-xs B-B1 border-none"
            v-model="currTab"
            :selections="tabsList.map((v, i) => ({ label: v.name, value: i }))"
          />
        </template>
        <template #default="{ option }">
          <view
            class="B-B1 MT-md PD-md R-sm"
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
