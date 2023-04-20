<!--
 * @Date: 2023-02-28 21:36:50
 * @LastEditTime: 2023-03-04 12:58:01
 * @FilePath: /my-vue3-project/src/components/Tabs/TabsItem.vue
 * 介绍:
-->
<script lang="ts" setup>
const props = defineProps<{
  key?: StrNumber;
  title?: StrNumber;
}>();
</script>

<template>
  <view class="CtabsItem">
    <slot></slot>
  </view>
</template>

<style lang="less" scoped></style>
