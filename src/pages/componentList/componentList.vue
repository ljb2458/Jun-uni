<!--
 * @Date: 2023-06-14 19:49:30
 * @LastEditTime: 2023-07-04 09:56:29
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
  {
    title: "折叠面板",
    message: "暂不支持小程序",
    onClick() {
      router.push("src/pages/_collapse/_collapse.vue");
    },
  },
]);
</script>
<template>
  <CpageView>
    <Ccell
      class="MT-sm"
      v-for="cell in cells"
      :left-text="cell.title"
      :right-text="cell.message"
      @click="cell.onClick"
      active
      :right-icon="true"
    >
    </Ccell>
  </CpageView>
</template>
<style lang="scss" scoped></style>
