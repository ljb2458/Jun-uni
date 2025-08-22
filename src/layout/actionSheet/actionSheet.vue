<!-- 全局操作菜单 -->
<script setup lang="ts">
import { actionSheetProps, showActionSheet, OnSelect } from "./index";

const onSelect: OnSelect = (e) => {
  if (typeof e.item?.onSelect == "function") e.item.onSelect(e);
};
</script>

<template>
  <wd-action-sheet
    cancel-text="关闭"
    :="actionSheetProps"
    @select="onSelect"
    v-model="showActionSheet"
  ></wd-action-sheet>
</template>

<style lang="scss" scoped></style>
