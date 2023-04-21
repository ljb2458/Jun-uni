<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-04-21 17:42:54
 * @FilePath: /music-client/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import { CswiperOptions } from "@@/components/common/Cswiper";
const swiperOption = reactive<CswiperOptions<{ name: string }>>([
  {
    name: "a",
  },
  {
    name: "b",
  },
  {
    name: "c",
  },
]);
</script>

<template>
  <CpageView>
    <Cswiper :options="swiperOption">
      <template #default="{ option }">
        <view style="border: red solid 1rpx; height: 200vh">
          {{ option.name }}
        </view>
      </template>
    </Cswiper>
    
  </CpageView>
</template>

<style lang="scss" scoped></style>
