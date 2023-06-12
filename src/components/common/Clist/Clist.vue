<!--
 * @Date: 2023-04-21 21:21:57
 * @LastEditTime: 2023-06-12 15:29:06
 * @FilePath: /music-client/src/components/common/CList/CList.vue
 * 介绍:
-->
<script lang="ts" setup>
import { generateUUID } from "@@/utils/tools/generate";
import { isNodeVisible } from "@@/hooks/rewriteUni";
import { StateType } from "@@/hooks/useRequestList";
import { LoadParam } from "./index";
const props = withDefaults(
  defineProps<{
    /**列表状态 */
    status?: StateType;
    message?: string;
    minHeight?: string;
    setupLoad?: boolean;
    onReachBottom?: (callback: typeof slideLoad) => void;
  }>(),
  {
    minHeight: "70vh",
    setupLoad: true,
  }
);

if (props.setupLoad) load();

const ClistId = `Clist${generateUUID()}`;
const _this = getCurrentInstance();
const reachBottom = props.onReachBottom || onReachBottom;
reachBottom(slideLoad);

async function slideLoad() {
  //防止不活跃的列表加载
  if (!(await isNodeVisible(`#${ClistId}`, _this))) return;
  load();
}

const emit = defineEmits<{
  (e: "load", v: LoadParam): void;
}>();

function load() {
  if (props.status === "next") emit("load", { reload: false });
}
function reload() {
  if (props.status !== "loading") emit("load", { reload: true });
}
</script>
<template>
  <view :style="{ minHeight: props.minHeight }" :id="ClistId" class="Clist">
    <slot></slot>
    <ClistStatus
      @load="load"
      @reload="reload"
      :type="props.status"
      :message="props.message"
    />
  </view>
</template>
<style lang="scss" scoped></style>
