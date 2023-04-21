<!--
 * @Date: 2023-04-21 21:21:57
 * @LastEditTime: 2023-04-22 00:27:14
 * @FilePath: /music-client/src/components/common/CfullList/CfullList.vue
 * 介绍:
-->
<script lang="ts" setup>
import { generateUUID } from "@@/utils/tools/generate";
import { isNodeVisible } from "@@/hooks/rewriteUni";

const _this = getCurrentInstance();
const CfullListId = `Clist${generateUUID()}`;
onReachBottom(async () => {
  //防止不活跃的列表加载
  if (!(await isNodeVisible(`#${CfullListId}`, _this))) return;
  onListLoad();
});
const emit = defineEmits<{
  (e: "load"): void;
}>();
function onListLoad() {
  console.log("load");
  emit("load");
}
</script>
<template>
  <view :id="CfullListId" class="CfullList">
    <slot></slot>
    <ClistStatus
      @load="onListLoad"
      :type="'null'"
      :message="'没有更多数据了'"
    />
  </view>
</template>
<style lang="scss" scoped></style>
