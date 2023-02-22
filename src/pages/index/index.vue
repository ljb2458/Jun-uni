<!--
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-02-19 14:09:48
 * @FilePath: /my-vue3-project/src/pages/index/index.vue
 * 介绍:
-->
<template>
  <PageView class="content">
    <u-button type="primary" text="确定"></u-button>
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </PageView>
</template>

<script setup lang="ts">
import { apiTest400 } from "@@/api/module/apiTest";
import { ref } from "vue";
const title = ref("Hello");
apiTest400();
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
