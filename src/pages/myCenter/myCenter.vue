<!--
 * @Date: 2023-06-14 19:49:30
 * @LastEditTime: 2023-06-15 14:18:05
 * @FilePath: /music-client/src/pages/myCenter/myCenter.vue
 * 介绍:
-->
<cfg lang="json">
{
  "title": "个人中心",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
import modal from "@@/layout/modal";
function test() {
  modal
    .show({
      title: "温馨提示",
      content: "富有安全感的ts支持为您的开发保驾护航",
    })
    .then(() => {
      console.log("点击了确认");
    })
    .catch(() => {
      console.log("点击了取消");
    });
}
</script>
<template>
  <CpageView use-modal>
    <Rbutton @click="test">打开提示</Rbutton>
  </CpageView>
</template>
<style lang="scss" scoped></style>
