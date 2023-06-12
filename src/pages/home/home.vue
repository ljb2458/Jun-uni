<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-06-12 15:47:43
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

function api() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          data: [1, 2, 3, 4, 5, 6],
        },
      });
    }, 3000);
  });
}
</script>

<template>
  <CpageView>
    <view style="border: red solid 1rpx; height: 200rpx">6666</view>
    <CtabsFor :sticky="true" :options="tabsForOptions">
      <template #default="{ option }">
        <CrequestList :api="api">
        
        </CrequestList>
      </template>
    </CtabsFor>
  </CpageView>
</template>

<style lang="scss" scoped></style>
