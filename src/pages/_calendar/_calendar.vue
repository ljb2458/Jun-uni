<!--
 * @Date: 2023-07-03 16:07:29
 * @LastEditTime: 2023-07-03 17:22:00
 * 介绍:
-->
<cfg lang="json">
{
  "title": "日期选择器",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
const show = ref(false);
const date = reactive<string[]>([]);
function close() {
  show.value = false;
}
function confirm(e: string[]) {
  show.value = false;
  date.push(...e);
}
</script>
<template>
  <CpageView>
    <Rbutton @click="show = true">选择日期</Rbutton>
    <Rcalendar
      :mode="'multiple'"
      :show="show"
      @close="close"
      @confirm="confirm"
    ></Rcalendar>
    <view>选选择的日期： {{ date.join(" , ") }}</view>
  </CpageView>
</template>
<style lang="scss" scoped></style>
