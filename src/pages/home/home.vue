<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-06-15 17:36:46
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
import { apiWithdrawCoinLogs, WithdrawCoinLogs } from "@@/api/module/list";
import { useCrequestListRef } from "@@/components/common/CrequestList";
import notify from "@@/layout/notify";

const tabsForOptions = computed(() => [
  {
    name: "全部",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品1",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品2",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品3",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品4",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品5",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品6",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品7",
    api: apiWithdrawCoinLogs,
  },
  {
    name: "商品8",
    api: apiWithdrawCoinLogs,
  },
]);
function test() {
  notify.primary("这是一个通知");
}

const CrequestListRefs = tabsForOptions.value.map(() => useCrequestListRef());
function listSetNull(index: number) {
  const instance = CrequestListRefs[index].value;
  if (!instance) return;
  instance.data.length = 0;
}
</script>

<template>
  <CpageView>
    <view @click="test" style="border: red solid 1rpx; height: 200rpx">
      点击发起一个通知
    </view>

    <CtabsFor title-scrollable :sticky="true" :options="tabsForOptions">
      <template #title-bottom>
        <Cgrid class="MT-md">
          <CgridItem v-for="(tab, index) in tabsForOptions">
            <Rbutton
              :type="'primary'"
              :size="'mini'"
              @click="listSetNull(index)"
            >
              清空列表"{{ tab.name }}"
            </Rbutton>
          </CgridItem>
        </Cgrid>
      </template>
      <template #default="{ option }">
        <CrequestList
          :ref="CrequestListRefs[option.index]"
          :api="option.api"
          :key="option.key"
        >
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
