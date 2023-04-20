<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-04-20 19:10:01
 * @FilePath: /music-client/src/pages/myCenter/myCenter.vue
 * 介绍:
-->
<script lang="ts" setup></script>

<template>
  <CpageView>
    <Ctabs>
      <CtabsItem :title="'你好1'">
        <Bh1 style="border: red solid 1rpx; height: 100vh">大佬1</Bh1>
      </CtabsItem>
      <CtabsItem :title="'你好2'">
        <Bh1 style="border: red solid 1rpx; height: 100vh">大佬2</Bh1>
      </CtabsItem>
      <CtabsItem :title="'你好3'">
        <Bh1 style="border: red solid 1rpx; height: 100vh">大佬3</Bh1>
      </CtabsItem>
    </Ctabs>
  </CpageView>
</template>

<style lang="scss" scoped></style>
