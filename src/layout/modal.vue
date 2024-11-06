<script lang="ts" setup>
import { ModalRef } from "@ttou/uv-typings/types/modal";
import { showModal, modalProps, onReject, onResovle } from "./setModal";
const modalRef = ref<ModalRef>();
watch(showModal, (newValue) => {
  if (newValue) modalRef.value?.open();
  else modalRef.value?.close();
});
</script>
<template>
  <uv-modal
    :="modalProps"
    ref="modalRef"
    @confirm="onResovle"
    @cancel="onReject"
    @close="onReject"
  >
    <block v-if="modalProps.content">{{ modalProps.content }}</block>
    <slot v-else></slot>
  </uv-modal>
</template>
<style lang="scss" scoped></style>
