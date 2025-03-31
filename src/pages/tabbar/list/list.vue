<cfg lang="json">
{
  "navigationBarTitleText": "组件列表",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { _import } from "@/utils/tools/import";

const tabsList = reactive([
  {
    name: "展示组件",
  },
  {
    name: "业务组件",
  },
]);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="P-row-md">
      <CoTabsFor :options="tabsList">
        <template #title-bottom>
          <GrFilterSearch class="MT-xs B-none PD-0" bg="var(--C-white)" />
        </template>
        <template #default="{ option }">
          <CoCell class="MT-md" leftText="自动正方形"> </CoCell>
        </template>
      </CoTabsFor>
    </view>
  </CoPageView>
</template>

<style lang="scss"></style>
