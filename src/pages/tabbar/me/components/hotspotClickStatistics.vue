<!-- 文档地址 https://ext.dcloud.net.cn/plugin?id=4899 -->
<script setup lang="ts">
import { echarts } from "@/uni_modules/echart";
import type { EChartsOption } from "echarts";

const chartRef = ref();
async function init() {
  if (!chartRef.value) return;
  const myChart: echarts.EChartsType = await chartRef.value.init(echarts);
  getInteractionTapStatistics();

  async function getInteractionTapStatistics() {
    const xData = [
      "2023/01/01",
      "2023/01/15",
      "2023/02/01",
      "2023/02/15",
      "2023/03/01",
      "2023/03/15",
      "2023/04/01",
      "2023/04/15",
      "2023/05/01",
      "2023/05/15",
      "2023/06/01",
      "2023/06/15",
      "2023/07/01",
      "2023/07/15",
      "2023/08/01",
      "2023/08/15",
      "2023/09/01",
      "2023/09/15",
      "2023/10/01",
      "2023/10/15",
      "2023/11/01",
      "2023/11/15",
      "2023/12/01",
      "2023/12/15",
    ];
    const yData = [
      120, 145, 132, 155, 101, 125, 134, 148, 90, 115, 230, 250, 210, 225, 190,
      205, 175, 190, 165, 180, 155, 170, 195, 210,
    ];
    const options: EChartsOption = {
      tooltip: {
        trigger: "axis",
        shadowBlur: 0,
        borderWidth: 0,
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xData,
        axisLabel: {
          fontSize: 12,
          formatter: function (value: string) {
            // 只显示月份和日期，简化显示
            return value.substring(5);
          },
        },
      },
      yAxis: {
        type: "value",
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 25,
        },
        {
          type: "slider",
          bottom: 0,
          borderColor: "#52B8D5",
          fillerColor: "#52B8D533",
        },
      ],
      series: [
        {
          name: "点击量",
          type: "line",
          data: yData,
          smooth: false,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            // 白色数据点
            color: "#fff",
            borderColor: "#52B8D5",
            borderWidth: 2,
          },
          tooltip: {
            valueFormatter(value: any) {
              return `${value}(人)`;
            },
          },
          lineStyle: {
            width: 3,
            color: "#52B8D5",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#52B8D588",
                },
                {
                  offset: 1,
                  color: "#52B8D500",
                },
              ],
            },
          },
          emphasis: {
            itemStyle: {
              color: "#3498db",
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        },
      ],
    };
    myChart.setOption(options);
  }
}
</script>

<template>
  <view class="h-50 w-full">
    <l-echart ref="chartRef" @finished="init"></l-echart>
  </view>
</template>

<style lang="scss" scoped></style>
