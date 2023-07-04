<!--
 * @Date: 2023-07-04 11:30:19
 * @LastEditTime: 2023-07-04 11:55:30
 * 介绍:
-->
<cfg lang="json">
{
  "title": "滑动单元格",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
import {
  RswipeActionOptionsItem,
  RswipeActionClickEvent,
} from "@@/components/rewrite/RswipeAction/index";
const options = computed<RswipeActionOptionsItem[]>(() => [
  {
    text: "取消",
  },
]);
function test(e: RswipeActionClickEvent) {
  console.log(e);
}
</script>
<template>
  <CpageView>
    <u-swipe-action>
      <RswipeAction show @click="test" :options="options"> 测试 </RswipeAction>
      <RswipeAction @click="test" :options="options"> 测试 </RswipeAction>
      <RswipeAction @click="test" :options="options"> 测试 </RswipeAction>
    </u-swipe-action>
  </CpageView>
</template>
<style lang="scss" scoped></style>
