<!--
 * @Date: 2023-02-19 17:17:55
 * @LastEditTime: 2023-06-12 21:11:00
 * @FilePath: /music-client/src/pages/login/login.vue
 * 介绍:
-->
<cfg lang="json">
  {
    "title": "登录"
  }
  </cfg>
<script lang="ts" setup>
function onLogin() {}
</script>

<template>
  <CpageView>
    <Rinput prefixIcon="account-fill" placeholder="请输入账号"> </Rinput>
    <Rinput prefixIcon="lock-fill" placeholder="请输入密码" type="pwd"></Rinput>
    <Rbutton @click="onLogin" type="primary" text="登录" class="mt-lg" />
  </CpageView>
</template>

<style lang="scss" scoped></style>
