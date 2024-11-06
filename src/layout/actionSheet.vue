<script setup lang="ts">
import type { ActionSheetRef } from "@ttou/uv-typings/types/actionSheet";
import {
  actionSheetProps,
  ActionSheetOptionsItem,
  showActionSheet,
} from "./setActionSheet";
const actionSheetRef = ref<ActionSheetRef>();

watch(showActionSheet, (newValue) => {
  if (newValue) actionSheetRef.value?.open();
  else actionSheetRef.value?.close();
});

function select(item: ActionSheetOptionsItem) {
  item.tap();
}
</script>

<template>
  <uv-action-sheet
    :="actionSheetProps"
    ref="actionSheetRef"
    @select="<any>select"
    @close="showActionSheet = false"
  ></uv-action-sheet>
</template>

<style lang="scss" scoped></style>
