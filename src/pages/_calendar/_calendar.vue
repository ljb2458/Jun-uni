<!--
 * @Date: 2023-07-03 16:07:29
 * @LastEditTime: 2023-07-05 19:31:51
 * 介绍:
-->
<cfg lang="json">
{
  "title": "日期选择器",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
import { Mode, CustomListItem } from "@/components/rewrite/Rcalendar";

const show = ref(false);
const date = reactive<string[]>([]);
function close() {
  show.value = false;
}
function confirm(e: string[]) {
  show.value = false;
  date.push(...e);
}
const mode = ref<Mode>("multiple");
function formatter(day: CustomListItem) {
  //*周日显示小点
  if (day.week === 0) day.dot = true;
  return day;
}
</script>
<template>
  <CpageView>
    <u-radio-group v-model="mode">
      <Rradio class="ML-sm" name="single" label="单个日期" />
      <Rradio class="ML-sm" name="range" label="日期范围" />
      <Rradio class="ML-sm" name="multiple" label="多个日期" />
    </u-radio-group>
    <Rbutton class="MT-md" @click="show = true">选择日期</Rbutton>
    <Rcalendar
      :formatter="formatter"
      :mode="mode"
      :show="show"
      @close="close"
      @confirm="confirm"
    ></Rcalendar>
    <view class="MT-md">选择的日期： {{ date.join(" , ") }}</view>
  </CpageView>
</template>
<style lang="scss" scoped></style>
