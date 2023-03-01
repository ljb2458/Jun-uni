<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-03-02 00:07:51
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
  <PageView use-pull-down>
    <view>
      <Mbutton type="primary" @click="router.push('src/pages/login/login.vue')">
        登录
      </Mbutton>
      <Mbutton type="primary" @click="router.push('src/pages/index/index.vue')">
        index
      </Mbutton>
      <Mbutton @click="testShowModal">测试弹出窗口</Mbutton>
      <Mh1>h1 测试</Mh1>
      <Mh2>h2 测试</Mh2>
      <Mh3>h3 测试</Mh3>
      <Mh4>h4 测试</Mh4>
      <Mh5>h5 测试</Mh5>
      <view>view 测试</view>
      <text>text 测试</text>
      <Tabs>
        <TabsItem title="1">
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
          <Mh1> 我是内容aaa aaaaaaaaa</Mh1>
        </TabsItem>
        <TabsItem title="2">
          <Mh1> 我是内容aaa bbbbbbbbbb</Mh1>
        </TabsItem>
      </Tabs>
    </view>
  </PageView>
</template>

<style lang="scss" scoped></style>
