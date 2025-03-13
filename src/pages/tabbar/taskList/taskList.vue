<cfg lang="json">
{
  "navigationBarTitleText": "任务列表",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": true
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { _import } from "@/utils/tools/import";

const tabsList = reactive([
  {
    name: "任务列表",
  },
  {
    name: "问题列表",
  },
]);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="P-row-md">
      <CoTabsFor :options="tabsList">
        <template #title-bottom>
          <GrFilterSearch
            class="MT-xs B-none PD-0"
            bg="var(--C-white)"
            :selections="tabsList.map((v, i) => ({ label: v.name, value: i }))"
          />
        </template>
        <template #default="{ option }">
          <view style="height: 300px" class="B-M1">{{ option.index }}</view>
        </template>
      </CoTabsFor>
    </view>
  </CoPageView>
</template>

<style lang="scss">
.u-collapse-item {
  .u-icon__img {
    height: 22px !important;
    width: 16px !important;
  }
}

.grid-2 {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
