<!--
 * @Date: 2023-04-21 21:21:57
 * @LastEditTime: 2023-06-12 11:24:10
 * @FilePath: /music-client/src/components/common/CfullList/CfullList.vue
 * 介绍:
-->
<script lang="ts" setup>
import { generateUUID } from "@@/utils/tools/generate";
import { isNodeVisible } from "@@/hooks/rewriteUni";
import { StateType } from "@@/hooks/useRequestList";
const props = withDefaults(
  defineProps<{
    /**列表状态 */
    status?: StateType;
    message?: string;
    minHeight?: string;
  }>(),
  {
    minHeight: "70vh",
  }
);

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
  emit("load");
}1
onMounted(() => {
  onListLoad();
});
</script>
<template>
  <view
    :style="{ minHeight: props.minHeight }"
    :id="CfullListId"
    class="CfullList"
  >
    <slot></slot>
    <ClistStatus
      @load="onListLoad"
      :type="props.status"
      :message="props.message"
    />
  </view>
</template>
<style lang="scss" scoped></style>
