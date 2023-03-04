<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-03-04 13:05:48
 * @FilePath: /my-vue3-project/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import router from "@@/hooks/router";
import { uniShowModal } from "@@/hooks/rewriteUni";
function testShowModal() {
  uniShowModal("请确定")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <PageView>
    <Mbutton type="primary" @click="router.push('src/pages/login/login.vue')">
      登录
    </Mbutton>
    <Mbutton type="primary" @click="router.push('src/pages/index/index.vue')">
      index
    </Mbutton>
  </PageView>
</template>

<style lang="scss" scoped></style>
