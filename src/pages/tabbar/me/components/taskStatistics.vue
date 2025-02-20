<script setup lang="ts">
const props = defineProps<{
  scrollTop: number;
}>();
// 定义图表数据
const chartData = computed(() => ({
  series: [
    {
      data: [
        { name: "一班", value: 50 },
        { name: "二班", value: 30 },
        { name: "三班", value: 20 },
        { name: "四班", value: 18 },
        { name: "五班", value: 8 },
      ],
    },
  ],
}));

// 定义图表配置
const opts = ref({
  rotate: false,
  rotateLock: false,
  color: [
    "#1890FF",
    "#91CB74",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3CA272",
    "#FC8452",
    "#9A60B4",
    "#ea7ccc",
  ],
  padding: [5, 5, 5, 5],
  dataLabel: true,
  enableScroll: false,
  legend: {
    show: true,
    position: "top",
    lineHeight: 25,
  },
  title: {
    name: "收益率",
    fontSize: 15,
    color: "#666666",
  },
  subtitle: {
    name: "70%",
    fontSize: 25,
    color: "#7cb5ec",
  },
  extra: {
    ring: {
      ringWidth: 20,
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: false,
      borderWidth: 3,
      borderColor: "#FFFFFF",
    },
  },
});
</script>

<template>
  <CoCard class="B-B1 R-sm MG-md PD-sm">
    <view class="T-strong">饼图</view>
    <view class="charts-box">
      <qiun-data-charts
        :pageScrollTop="scrollTop"
        inScrollView
        type="ring"
        :opts="opts"
        :chartData="chartData"
        canvas-id="taskStatistics"
      />
    </view>
  </CoCard>
</template>

<style scoped>
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
