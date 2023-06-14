<!--
 * @Date: 2023-04-21 21:21:57
 * @LastEditTime: 2023-06-14 20:34:49
 * @FilePath: /music-client/src/components/common/Clist/Clist.vue
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
    /**上拉触底事件，一般可不传 */
    onReachBottom?: (callback: Function) => any;
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
reachBottom(activeLoad);

const emit = defineEmits<{
  (e: "load", v: LoadParam): void;
}>();

async function activeLoad() {
  if (!(await isVisible())) return;
  load();
}

async function activeRelad() {
  if (!(await isVisible())) return;
  reload();
}

/**判断列表是否在页面中可见 */
function isVisible() {
  return isNodeVisible(`#${ClistId}`, _this);
}

function load() {
  if (props.status === "next") emit("load", { reload: false });
}
function reload() {
  if (props.status !== "loading") emit("load", { reload: true });
}
defineExpose({ activeLoad, activeRelad, load, reload, isVisible });
</script>
<template>
  <view :style="{ minHeight: props.minHeight }" :id="ClistId" class="Clist">
    <slot></slot>
    <ClistStatus
      class="MT-md"
      @load="load"
      @reload="reload"
      :type="props.status"
      :message="props.message"
    />
  </view>
</template>
<style lang="scss" scoped></style>
