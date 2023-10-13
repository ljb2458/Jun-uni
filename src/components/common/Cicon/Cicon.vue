<!--
 * @Date: 2023-04-30 18:31:07
 * @LastEditTime: 2023-09-09 10:56:57
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
    :style="{ fontSize: props.size, color: props.color }"
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
}
</style>
