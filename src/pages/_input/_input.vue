<!--
 * @Date: 2023-07-05 17:31:36
 * @LastEditTime: 2023-07-05 19:25:35
 * 介绍:input输入框
-->
<cfg lang="json">
{
  "title": "input输入框",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
const fromData = reactive({
  pwd: "",
  text: "",
  number: "",
  digit: "",
});
</script>
<template>
  <CpageView>
    <Rinput label="密码：" v-model="fromData.pwd" :type="'pwd'"> </Rinput>
    <Rinput label="基本使用:" v-model="fromData.text"> </Rinput>
    <Rinput label="数字:" v-model="fromData.number" :type="'number'"></Rinput>
    <Rinput label="整数:" v-model="fromData.digit" :type="'digit'">
      <template #left>
        <Rbutton :size="'mini'">前置插槽</Rbutton>
      </template>
      <template #right>
        <Rbutton :size="'mini'">后置插槽</Rbutton>
      </template>
    </Rinput>
  </CpageView>
</template>
<style lang="scss" scoped></style>
