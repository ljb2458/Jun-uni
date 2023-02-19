<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-02-19 17:51:22
 * @FilePath: /my-vue3-project/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import router from "@@/hooks/router";
</script>

<template>
  <view>
    <view>
      <u-button @click="router.push('/pages/login/login')"> 登录 </u-button>
    </view>
  </view>
</template>

<style lang="less" scoped></style>
