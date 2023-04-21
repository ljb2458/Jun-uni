<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-04-21 21:23:53
 * @FilePath: /music-client/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import { CtabsForOptions } from "@@/components/common/CtabsFor";
const tabsForOptions = reactive<CtabsForOptions<{ name: string }>>([
  {
    name: "全部",
  },
  {
    name: "商品1",
  },
  {
    name: "商品2",
  },
]);
</script>

<template>
  <CpageView>
    <view style="border: red solid 1rpx; height: 200rpx">6666</view>
    <CtabsFor :sticky="true" :options="tabsForOptions">
      <template #default="{ option }">
        <view style="border: red solid 1rpx; height: 200vh">
          {{ option.name }}
        </view>
      </template>
    </CtabsFor>
  </CpageView>
</template>

<style lang="scss" scoped></style>
