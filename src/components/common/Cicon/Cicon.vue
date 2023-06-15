<!--
 * @Date: 2023-04-30 18:31:07
 * @LastEditTime: 2023-06-15 19:07:17
 * @FilePath: /music-client/src/components/common/Cicon/Cicon.vue
 * 介绍:
-->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: StrNumber;
    color?: string;
    name?: string;
  }>(),
  {
    size: "inherit",
    color: "inherit",
  }
);
</script>

<template>
  <i
    class="Cicon"
    :class="name"
    :style="{ '--Cicon-font-size': props.size, '--Cicon-color': props.color }"
  >
  </i>
</template>

<style lang="scss" scoped>
.Cicon {
  display: inline-block;
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--Cicon-font-size);
  color: var(--Cicon-color);
}
</style>
