<script lang="ts" setup>
import { show, config, onReject, onResovle } from "./setModal";
</script>
<template>
  <u-modal :="config" v-model:show="show" @confirm="onResovle" @cancel="onReject" @close="onReject">
    <slot></slot>
  </u-modal>
</template>
<style lang="scss" scoped></style>
