<!-- 全局 notify 提示 -->
<script lang="ts" setup>
import { showNotify, notifyProps } from ".";
</script>
<template>
  <CoNotify :="notifyProps" v-model:show="showNotify">
    <slot></slot>
  </CoNotify>
</template>
<style lang="less" scoped></style>
