<!--
 * @Date: 2023-07-04 11:30:19
 * @LastEditTime: 2023-07-05 17:29:28
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
import notify from "@@/layout/notify";
const options = computed<RswipeActionOptionsItem[]>(() => [
  {
    text: "取消",
  },
  {
    text: "确定",
  },
]);
function test(e: RswipeActionClickEvent) {
  notify.primary("点击了" + options.value[Number(e.index)].text);
}
</script>
<template>
  <CpageView>
    <u-swipe-action>
      <RswipeAction @click="test" :options="options">
        按住向左滑动
      </RswipeAction>
      <RswipeAction @click="test" :options="options">
        按住向左滑动
      </RswipeAction>
      <RswipeAction @click="test" :options="options">
        按住向左滑动
      </RswipeAction>
    </u-swipe-action>
  </CpageView>
</template>
<style lang="scss" scoped></style>
