<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-04-20 18:55:57
 * @FilePath: /music-client/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import router from "@@/hooks/router";
</script>

<template>
  <CpageView>
    <Rbutton type="primary" @click="router.push('src/pages/login/login.vue')">
      登录
    </Rbutton>
    <Rbutton type="primary" @click="router.push('src/pages/index/index.vue')">
      index
    </Rbutton>
  </CpageView>
</template>

<style lang="scss" scoped></style>
