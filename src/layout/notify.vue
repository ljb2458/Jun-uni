<!--
 * @Date: 2023-06-14 16:33:18
 * @LastEditTime: 2023-06-14 20:11:04
 * @FilePath: /music-client/src/layout/notify.vue
 * 介绍:
-->
<script lang="ts" setup>
import { useRnotifyRef } from "@@/components/rewrite/Rnotify";
import { show, message, param } from "./notify";
const RnotifyRef = useRnotifyRef();
onMounted(() => {
  watch(
    () => show.value,
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
