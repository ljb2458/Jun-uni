<cfg lang="json">
{
  "title": "modal模态框",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
import modal from "@/layout/modal";
import notify from "@/layout/notify";
function showModal() {
  modal
    .show({
      title: "温馨提示",
      content: "富有安全感的ts支持为您的开发保驾护航",
    })
    .then(() => {
      notify.primary("点击了确认");
    })
    .catch(() => {
      notify.error("点击了取消");
    });
}
</script>
<template>
  <CpageView use-modal>
    <Rbutton @click="showModal">打开提示</Rbutton>
  </CpageView>
</template>
<style lang="scss" scoped></style>
