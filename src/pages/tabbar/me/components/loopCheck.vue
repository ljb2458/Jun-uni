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
  enableScroll: false,
  legend: {
    show: true,
    position: "top",
    lineHeight: 25,
  },
  extra: {
    pie: {
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
    <view class="T-strong">环图</view>
    <view class="charts-box">
      <qiun-data-charts
        :pageScrollTop="scrollTop"
        inScrollView
        type="pie"
        :opts="opts"
        :chartData="chartData"
        canvas-id="loopCheck"
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
