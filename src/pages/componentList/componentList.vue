<!--
 * @Date: 2023-06-14 19:49:30
 * @LastEditTime: 2023-07-03 15:15:22
 * @FilePath: /music-client/src/pages/componentList/componentList.vue
 * 介绍:
-->
<cfg lang="json">
{
  "title": "组件列表",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
import router from "@@/hooks/router";
const cells = computed(() => [
  {
    title: "全局模态框",
    onClick() {
      router.push("src/pages/_modal/_modal.vue");
    },
  },
]);
</script>
<template>
  <CpageView>
    <Ccell
      v-for="cell in cells"
      :left-text="cell.title"
      @click="cell.onClick"
      active
      :right-icon="true"
    >
    </Ccell>
  </CpageView>
</template>
<style lang="scss" scoped></style>
