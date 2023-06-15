<!--
 * @Date: 2023-06-14 16:33:18
 * @LastEditTime: 2023-06-15 15:42:03
 * @FilePath: /music-client/src/layout/notify.vue
 * 介绍:
-->
<script lang="ts" setup>
import { useRnotifyRef } from "@@/components/rewrite/Rnotify";
import { show, message, param } from "./notify";
const RnotifyRef = useRnotifyRef();
onMounted(() => {
  watch(
    () => [show.value, message.value, param.value],
    (newValue) => {
      const show = newValue[0];
      if (show) return RnotifyRef.value?.show(message.value, param.value);
      RnotifyRef.value?.close();
    },
    {
      immediate: true,
      deep: true,
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
