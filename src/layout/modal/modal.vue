<!-- 全局 modal 提示框 -->
<script lang="ts" setup>
import { ModalRef } from "@ttou/uv-typings/types/modal";
import { showModal, modalProps, onReject, onResovle } from ".";
const modalRef = ref<ModalRef>();
onMounted(() => {
  watch(
    showModal,
    (newValue) => {
      if (newValue) modalRef.value?.open();
      else modalRef.value?.close();
    },
    { immediate: true }
  );
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
    <slot v-if="!modalProps.content || modalProps.useSlot"></slot>
    <block v-else>{{ modalProps.content }}</block>
  </uv-modal>
</template>
<style lang="scss" scoped></style>
