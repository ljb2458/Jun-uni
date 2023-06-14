<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-06-14 20:34:08
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
  notify.primary("十秒后的通知");
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
          <template #item="{ item }">
            <view class="MT-md">
              {{ item.actual_number }}
              {{ item.id }}
              {{ item.status }}
              {{ item.created_at }}
            </view>
          </template>
        </CrequestList>
      </template>
    </CtabsFor>
  </CpageView>
</template>

<style lang="scss" scoped></style>
