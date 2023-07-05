<!--
 * @Date: 2023-07-05 17:31:36
 * @LastEditTime: 2023-07-05 18:02:20
 * 介绍:input输入框
-->
<cfg lang="json">
{
  "title": "",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
const fromData = reactive({
  pwd: "",
});
</script>
<template>
  <CpageView>
    <Rinput v-model="fromData.pwd" :type="'pwd'"> </Rinput>
  </CpageView>
</template>
<style lang="scss" scoped></style>
