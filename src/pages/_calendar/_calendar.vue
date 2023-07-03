<!--
 * @Date: 2023-07-03 16:07:29
 * @LastEditTime: 2023-07-03 16:59:41
 * 介绍:
-->
<cfg lang="json">
{
  "title": "日期选择器",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
const show = ref(false);
</script>
<template>
  <CpageView>
    <Rbutton @click="show = true">选择日期</Rbutton>
    <Rcalendar v-model:show="show" @close="show = false"></Rcalendar>
  </CpageView>
</template>
<style lang="scss" scoped></style>
