<!--
 * @Date: 2023-06-14 16:33:18
 * @LastEditTime: 2023-07-06 14:41:45
 * 介绍:
-->
<script lang="ts" setup>
import { show, param } from "./setNotify";
</script>
<template>
  <CNotify :="param" v-model:show="show">
    <slot></slot>
  </CNotify>
</template>
<style lang="less" scoped></style>
