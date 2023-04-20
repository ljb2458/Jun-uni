<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-03-04 16:27:41
 * @FilePath: /my-vue3-project/src/pages/index/index.vue
 * 介绍:
-->

<script setup lang="ts">
import { apiTest400 } from "@@/api/module/apiTest";
import { _require } from "@@/utils/tools";
import { ref } from "vue";

const title = ref("Hello");
apiTest400();
</script>
<template>
  <CpageView use-pull-down>
    <Rimage class="logo" :src="_require('src/static/logo.png')" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </CpageView>
</template>

<style></style>
