<cfg lang="json">
{
  "navigationBarTitleText": "状态标签",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { CoStateOrm } from "@/components/common/CoStateTag/CoStateTag.vue";
import { bitsAuth } from "@/utils/tools/bits";
import { onPageScroll } from "@dcloudio/uni-app";
enum TaskStatus {
  /**待发布 */
  WaitPublished = 0b1,
  /**待接收 */
  WaitReceiving = 0b10,
  /**待处理 */
  WaitProcessed = 0b100,
  /**待审核 */
  WaitExamine = 0b1000,
  /**完成 */
  Completed = 0b10000,
}
/** 任务状态 orm 映射 */
const taskStateOrm = computed<CoStateOrm>(() => [
  {
    label: "待发布",
    value: TaskStatus.WaitPublished,
    style: { background: "#f59f0066", color: "#f59f00" }, // 黄色系，表示待发布状态
  },
  {
    label: "待接收",
    value: TaskStatus.WaitReceiving,
    style: { background: "#3498db66", color: "#3498db" }, // 蓝色系，表示待接收状态
  },
  {
    label: "待处理",
    value: TaskStatus.WaitProcessed,
    style: { background: "#9b59b666", color: "#9b59b6" }, // 紫色系，表示待处理状态
  },
  {
    label: "待审核",
    value: TaskStatus.WaitExamine,
    style: { background: "#e67e2266", color: "#e67e22" }, // 橙色系，表示待审核状态
  },
  {
    label: "完成",
    value: TaskStatus.Completed,
    style: { background: "#2ecc7166", color: "#2ecc71" }, // 绿色系，表示完成状态
  },
]);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="MT-md MB-xs F-S-lg">基本示例</view>
      <CoStateTag
        v-for="value in [
          TaskStatus.WaitPublished,
          TaskStatus.WaitReceiving,
          TaskStatus.WaitProcessed,
        ]"
        class="PD-row-xs F-S-sm R-max"
        :stateOrm="taskStateOrm"
        :isFun="bitsAuth"
        :value="value"
      ></CoStateTag>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
