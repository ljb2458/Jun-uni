<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-04-21 17:15:12
 * @FilePath: /music-client/src/pages/index/index.vue
 * 介绍:
-->

<script setup lang="ts">
import { _require } from "@@/utils/tools";
import { ref } from "vue";

const title = ref("Hello");
</script>
<template>
  <CpageView>
    <Rimage class="logo" :src="_require('src/static/logo.png')" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </CpageView>
</template>

<style></style>
