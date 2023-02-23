<!--
 * @Date: 2023-02-19 17:17:55
 * @LastEditTime: 2023-02-23 22:52:15
 * @FilePath: /my-vue3-project/src/pages/login/login.vue
 * 介绍:
-->
<script lang="ts" setup>
function onLogin() {}
</script>

<template>
  <PageView class="auto-mt">
    <Minput prefixIcon="account-fill" placeholder="请输入账号"> </Minput>
    <Minput prefixIcon="lock-fill" placeholder="请输入密码" type="pwd"></Minput>
    <Mbutton type="primary" text="登录" @click="onLogin" />
  </PageView>
</template>

<style lang="scss" scoped></style>
