<!--
 * @Date: 2023-02-19 14:00:04
 * @LastEditTime: 2023-06-13 18:00:59
 * @FilePath: /music-client/src/pages/myCenter/myCenter.vue
 * 介绍:
-->
<cfg lang="json">
{
  "title": "个人中心"
}
</cfg>
<script lang="ts" setup>
const _switch = ref(false);
</script>

<template>
  <CpageView>
    <Rswitch v-model="_switch"> </Rswitch>
  </CpageView>
</template>

<style lang="scss" scoped></style>
