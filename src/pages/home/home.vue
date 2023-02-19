<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-02-19 15:20:20
 * @FilePath: /my-vue3-project/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import { formatNumber } from "@@/utils/tools";
import router from "@@/hooks/router";
</script>

<template>
  <view>
    <view @click="router.push('/pages/index/index', { query: { aaa: 666 } })"
      >我是主页{{ formatNumber(99, 4) }}</view
    >
  </view>
</template>

<style lang="less" scoped></style>
