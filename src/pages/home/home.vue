<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-06-14 20:16:27
 * @FilePath: /music-client/src/pages/home/home.vue
 * 介绍:
-->
<cfg lang="json">
{
  "title": "主页",
  "enablePullDownRefresh": true
}
</cfg>
<script lang="ts" setup>
import { apiWithdrawCoinLogs } from "@@/api/module/list";
import notify from "@@/layout/notify";
setTimeout(() => {
  notify.primary("十秒后的弹窗");
}, 10000);

const tabsForOptions = reactive([
  {
    name: "全部",
    abc: "",
  },
  {
    name: "商品1",
    abc: "",
  },
  {
    name: "商品2",
    abc: "",
  },
]);
</script>

<template>
  <CpageView>
    <view style="border: red solid 1rpx; height: 200rpx">6666</view>
    <CtabsFor :sticky="true" :options="tabsForOptions">
      <template #default="{ option }">
        <CrequestList :api="apiWithdrawCoinLogs">
          <template #item="{ item }"> </template>
        </CrequestList>
      </template>
    </CtabsFor>
  </CpageView>
</template>

<style lang="scss" scoped></style>
