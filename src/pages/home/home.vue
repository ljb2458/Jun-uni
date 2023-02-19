<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-02-19 17:06:59
 * @FilePath: /my-vue3-project/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import { apiTest400 } from "@@/api/module/apiTest";
(async () => {
  const res = await apiTest400();
  console.log(res);
})();
</script>

<template>
  <view>
    <view>我是主页</view>
  </view>
</template>

<style lang="less" scoped></style>
