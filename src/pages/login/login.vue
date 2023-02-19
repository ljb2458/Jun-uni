<!--
 * @Date: 2023-02-19 17:17:55
 * @LastEditTime: 2023-02-19 20:44:05
 * @FilePath: /my-vue3-project/src/pages/login/login.vue
 * 介绍:
-->
<!--
 * @Date: 2023-02-19 17:17:55
 * @LastEditTime: 2023-02-19 20:23:16
 * @FilePath: /my-vue3-project/src/pages/login/login.vue
 * 介绍:
-->
<script lang="ts" setup>
function onLogin() {}
</script>

<template>
  <view class="auto-mt">
    <MInput prefixIcon="account-fill" placeholder="请输入账号"> </MInput>
    <MInput prefixIcon="lock-fill" placeholder="请输入密码" type="pwd"></MInput>
    <u-button type="primary" @click="onLogin">登录</u-button>
  </view>
</template>

<style lang="less" scoped></style>
