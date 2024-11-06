<!--
 * @Date: 2023-06-14 16:33:18
 * @LastEditTime: 2023-07-06 14:41:45
 * 介绍:
-->
<script lang="ts" setup>
import { showNotify, notifyProps } from "./setNotify";
</script>
<template>
  <CoNotify :="notifyProps" v-model:show="showNotify">
    <slot></slot>
  </CoNotify>
</template>
<style lang="less" scoped></style>
