<cfg lang="json">
{
  "navigationBarTitleText": "竖状步骤条",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
const steps1 = [
  {
    title: "项目启动",
    time: "2023-10-01",
    content: "项目正式启动，确定项目目标和团队成员分工。",
  },
  {
    title: "需求分析",
    time: "2023-10-05",
    content: "与客户沟通，明确需求并完成需求文档。",
  },
  {
    title: "设计阶段",
    time: "2023-10-10",
    content: "完成系统架构设计和UI设计，并提交评审。",
  },
];

const steps2 = [
  {
    title: "开发阶段",
    time: "2023-10-15",
    content: "开始编码，完成核心功能模块的开发。",
  },
  {
    title: "测试阶段",
    time: "2023-10-25",
    content: "进行单元测试和集成测试，修复发现的Bug。",
  },
  {
    title: "上线准备",
    time: "2023-11-01",
    content: "完成部署环境搭建，准备上线。",
  },
];

const steps3 = [
  {
    title: "项目启动",
    time: "2023-10-01",
    content: "项目正式启动，确定项目目标和团队成员分工。",
  },
  {
    title: "需求分析",
    time: "2023-10-05",
    content: "与客户沟通，明确需求并完成需求文档。",
  },
  {
    title: "设计阶段",
    time: "2023-10-10",
    content: "完成系统架构设计和UI设计，并提交评审。",
  },
  {
    title: "开发阶段",
    time: "2023-10-15",
    content: "开始编码，完成核心功能模块的开发。",
  },
  {
    title: "测试阶段",
    time: "2023-10-25",
    content: "进行单元测试和集成测试，修复发现的Bug。",
  },
  {
    title: "上线准备",
    time: "2023-11-01",
    content: "完成部署环境搭建，准备上线。",
  },
  {
    title: "上线发布",
    time: "2023-11-05",
    content: "项目正式上线，发布第一版本。",
  },
  {
    title: "用户反馈",
    time: "2023-11-10",
    content: "收集用户反馈，优化产品体验。",
  },
  {
    title: "项目总结",
    time: "2023-11-15",
    content: "总结项目经验，归档项目文档。",
  },
];
</script>

<template>
  <CoPageView class="demoPage B-B2 PB-md" :onPageScroll="onPageScroll">
    <!-- 竖状步骤条布局示例 -->
    <view class="PD-md">
      <view class="MT-md MB-md F-S-lg">基础示例</view>
      <CoStepLine v-for="item in steps1" :key="item.title">
        <template #right>
          <view class="PD-row-sm PB-sm">
            <view>{{ item.title }}</view>
            <view class="C-T3 F-S-sm MT-xs"> {{ item.content }}</view>
            <view class="C-T3 F-S-xs">{{ item.time }}</view>
          </view>
        </template>
      </CoStepLine>
      <view class="MT-md MB-md F-S-lg">自定义标点</view>
      <CoStepLine v-for="item in steps2" :key="item.title">
        <template #dot>
          <CoIcon name="cicon-fuzhi" />
        </template>
        <template #right>
          <view class="PD-row-sm PB-sm">
            <view>{{ item.title }}</view>
            <view class="C-T3 F-S-sm MT-xs"> {{ item.content }}</view>
            <view class="C-T3 F-S-xs">{{ item.time }}</view>
          </view>
        </template>
      </CoStepLine>
      <view class="MT-md MB-md F-S-lg">左右穿插</view>
      <CoStepLine v-for="(item, index) in steps3" :key="item.title">
        <template #left>
          <view v-if="index % 2 == 0" class="PD-row-sm PB-sm T-A-R">
            <view>{{ item.title }}</view>
            <view class="C-T3 F-S-sm MT-xs"> {{ item.content }}</view>
            <view class="C-T3 F-S-xs">{{ item.time }}</view>
          </view>
        </template>
        <template #right>
          <view v-if="index % 2 == 1" class="PD-row-sm PB-sm">
            <view>{{ item.title }}</view>
            <view class="C-T3 F-S-sm MT-xs"> {{ item.content }}</view>
            <view class="C-T3 F-S-xs">{{ item.time }}</view>
          </view>
        </template>
      </CoStepLine>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
