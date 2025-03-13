<script lang="ts" setup generic="F extends RequestList.Api">
import {
  useRequestList,
  RequestList,
} from "@/components/common/CoRequestList/useRequestList";
import CoList from "../CoList/CoList.vue";
import { CoListInstance, LoadParam } from "../CoList/CoList.vue";
import CRequestList from "./CoRequestList.vue";
export type CoRequestListInstance<F extends RequestList.Api> = Omit<
  GenericComponentExports<typeof CRequestList>,
  "list" | "result"
> & {
  list: RequestList.GetList<F>;
  result: RequestList.GetRes<F> | undefined;
};
type CoListProps = ComponentPropsType<typeof CoList>;
interface Props {
  api: F;
  extraParams?: any[];
  setupLoad?: boolean;
  defPageNo?: number;
  giveReq?: (req: RequestList.Req) => RequestList.GetParams<F>[0];
  param?: Partial<RequestList.GetParams<F>[0]>;
  /**上拉触底事件，一般可不传 */
  onReachBottom?: CoListProps["onReachBottom"];
  /**下拉刷新事件，一般可不传 */
  onPullDownRefresh?: (callback: Fun) => any;
  /**下拉刷新完成回调，默认uni.stopPullDownRefresh(关闭页面下拉刷新) */
  pullDownRefreshEnd?: (v?: RequestList.State) => void;
  minHeight?: string;
}
const props = withDefaults(defineProps<Props>(), {
  defPageNo: 1,
  minHeight: "70vh",
  setupLoad: true,
  giveReq: () => (req: RequestList.Req) => req,
});
(props.onPullDownRefresh || onPullDownRefresh)(pullDownRefreshRequset);
/**下拉刷新请求 */
async function pullDownRefreshRequset() {
  if (!(await isVisible())) return;
  if (state.value.type === "loading") return;
  const res = await rerequest();
  (props.pullDownRefreshEnd || uni.stopPullDownRefresh)(res);
}
function load(e: LoadParam) {
  if (e.reload) return rerequest();
  request();
}
const {
  result,
  list,
  state,
  request,
  rerequest,
  stateEnd,
  stateErr,
  stateLoading,
  stateNull,
  stateNext,
} = useRequestList(props.api, {
  giveExtraParams: () => props.extraParams || [],
  giveReq(req) {
    return { ...props.param, ...props.giveReq(req) };
  },
  defPageNo: props.defPageNo,
});
const _expose = {
  result,
  state,
  list,
  rerequest,
  stateEnd,
  stateErr,
  stateLoading,
  stateNull,
  stateNext,

  ...{ load: _load, activeLoad, activeRelad, reload, isVisible },
};
/**暴露分页hooks */
defineExpose(_expose);

const CListRef = ref<CoListInstance>();
function activeLoad() {
  return CListRef.value?.activeLoad();
}
function _load() {
  return CListRef.value?.load();
}
function activeRelad() {
  return CListRef.value?.activeRelad();
}
function reload() {
  return CListRef.value?.reload();
}
function isVisible() {
  return CListRef.value?.isVisible();
}
</script>
<template>
  <CoList
    class="CRequestList"
    ref="CListRef"
    :status="state.type"
    :message="state.message"
    :onReachBottom="onReachBottom"
    @load="load"
    :setup-load="setupLoad"
    :min-height="props.minHeight"
  >
    <slot :list="list" :result="result">
      <block v-for="(item, index) in list" :key="index">
        <slot
          :item="item"
          :index="index"
          :list="list"
          :result="result"
          name="item"
        >
        </slot>
      </block>
    </slot>
  </CoList>
</template>
<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
