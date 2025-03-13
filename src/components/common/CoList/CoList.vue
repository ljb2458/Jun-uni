<script lang="ts" setup>
import { randomUUID } from "@/utils/tools/generate";
import { isNodeVisible } from "@/utils/rewriteUni";
import type CoList from "./CoList.vue";
import { StateType } from "@/components/common/CoListStatus/CoListStatus.vue";

export interface LoadParam {
  reload: boolean;
}
export type CoListInstance = InstanceType<typeof CoList>;
export interface CoListProps {
  /**列表状态 */
  status?: StateType;
  message?: string;
  minHeight?: string;
  setupLoad?: boolean;
  /**上拉触底事件，一般可不传 */
  onReachBottom?: (callback: Function) => any;
}
const props = withDefaults(defineProps<CoListProps>(), {
  minHeight: "70vh",
  setupLoad: true,
});

if (props.setupLoad) load();

const CListId = `CList${randomUUID()}`;
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
  return isNodeVisible(`#${CListId}`, _this);
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
  <view :style="{ minHeight: props.minHeight }" :id="CListId" class="CList">
    <slot></slot>
    <CoListStatus
      class="MT-md"
      @load="load"
      @reload="reload"
      :type="props.status"
      :message="props.message"
    />
  </view>
</template>
<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
