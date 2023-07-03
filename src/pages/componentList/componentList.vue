<!--
 * @Date: 2023-06-14 19:49:30
 * @LastEditTime: 2023-07-03 16:06:49
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
  {
    title: "日期选择器",
    onClick() {
      router.push("src/pages/_calendar/_calendar.vue");
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
