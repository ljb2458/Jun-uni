<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-02-21 21:37:57
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
    </view>
  </view>
</template>

<style lang="less" scoped></style>
