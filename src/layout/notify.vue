<script lang="ts" setup>
import { useRnotifyRef } from "@@/components/rewrite/Rnotify";
import { show, message, param } from "./notify";
const RnotifyRef = useRnotifyRef();
onMounted(() => {
  watch(
    () => show,
    (newValue) => {
      if (newValue) return RnotifyRef.value?.show(message.value, param.value);
      RnotifyRef.value?.close();
    },
    {
      immediate: true,
    }
  );
});
</script>
<template>
  <Rnotify ref="RnotifyRef">
    <slot></slot>
  </Rnotify>
</template>
<style lang="less" scoped></style>
