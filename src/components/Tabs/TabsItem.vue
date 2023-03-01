<script lang="ts" setup>
const props = defineProps<{
  key?: StrNumber;
  title?: StrNumber;
}>();
</script>

<template>
  <view>
    <slot></slot>
  </view>
</template>

<style lang="less" scoped></style>
