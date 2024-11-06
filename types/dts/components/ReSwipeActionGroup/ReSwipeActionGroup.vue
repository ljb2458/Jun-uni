<!--
 * @Date: 2023-07-04 11:51:25
 * @LastEditTime: 2023-07-04 11:53:57
 * 介绍:
-->
<script lang="ts" setup>
defineProps<{
  /**是否自动关闭其他swipe按钮组 */
  autoClose?: boolean;
}>();
defineEmits<{
  (e: "click", index: StrNumber): void;
}>();
</script>
<template>
  <!-- <slot></slot> -->
</template>
<style lang="scss" scoped></style>
