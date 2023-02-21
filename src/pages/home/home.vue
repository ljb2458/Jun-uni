<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-02-21 22:32:44
 * @FilePath: /my-vue3-project/src/pages/home/home.vue
 * 介绍:
-->
<script lang="ts" setup>
import router from "@@/hooks/router";
import showModal from "@@/hooks/showModal";
function testShowModal() {
  showModal("请确定", { title: "温馨提示", editable: true })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <view>
    <view>
      <Mbutton type="primary" @click="router.push('/pages/login/login')">
        登录
      </Mbutton>
      <Mbutton @click="testShowModal"> 测试弹出窗口 </Mbutton>
      <Mh1>h1 测试</Mh1>
      <Mh2>h2 测试</Mh2>
      <Mh3>h3 测试</Mh3>
      <Mh4>h4 测试</Mh4>
      <Mh5>h5 测试</Mh5>
      <view>view 测试</view>
      <text>text 测试</text>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
