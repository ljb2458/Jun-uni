<script lang="ts" setup>
import { show, config } from "./modal";
import { onReject, onResovle } from "./modal";
</script>
<template>
  <Rmodal
    :="config"
    v-model:show="show"
    @confirm="onResovle"
    @cancel="onReject"
    @close="onReject"
  >
    <slot></slot>
  </Rmodal>
</template>
<style lang="scss" scoped></style>
