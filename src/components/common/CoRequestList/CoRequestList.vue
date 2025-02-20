<script lang="ts" setup generic="F extends RequestList.Api">
import {
  useRequestList,
  RequestList,
} from "@/components/common/CoRequestList/useRequestList";
import CoList from "../CoList/CoList.vue";
import { Instance as CoListInstance, LoadParam } from "../CoList/CoList.vue";
import CRequestList from "./CoRequestList.vue";
export type Instance<F extends RequestList.Api> = Omit<
  GenericComponentExports<typeof CRequestList>,
  "data" | "res"
> & {
  data: RequestList.ApiData<F>;
  res: RequestList.ApiRes<F> | undefined;
};
type CoListProps = ComponentPropsType<typeof CoList>;
interface Props {
  api: F;
  requestBefore?: RequestList.RequestBefore<F>;
  extraParams?: any[];
  isOnePage?: boolean;
  setupLoad?: boolean;
  params?: RequestList.ApiParams<F>;
  /**上拉触底事件，一般可不传 */
  onReachBottom?: CoListProps["onReachBottom"];
  /**下拉刷新事件，一般可不传 */
  onPullDownRefresh?: (callback: Fun) => any;
  /**下拉刷新完成回调，默认uni.stopPullDownRefresh(关闭页面下拉刷新) */
  pullDownRefreshEnd?: (v?: RequestList.State) => void;
  /**解决微信小程序v-for循环无法获取ref的问题 */
  _ref?: any;
  minHeight?: string;
}
const props = withDefaults(defineProps<Props>(), {
  minHeight: "70vh",
  setupLoad: true,
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
  res,
  data,
  state,
  request,
  rerequest,
  stateEnd,
  stateErr,
  stateLoading,
  stateNull,
  stateNext,
} = useRequestList(props.api, props.isOnePage, {
  requestBefore: props.requestBefore,
  returnExtraParams: () => props.extraParams || [],
  returnReq: () => props.params || {},
});
const _expose = {
  res,
  state,
  data,
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
/**解决微信小程序v-for循环无法获取ref的问题 */
if (props._ref) props._ref.value = _expose;
onUnmounted(() => {
  if (props._ref) props._ref.value = null;
});

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
    <slot :data="data" :res="res">
      <slot
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        name="item"
      >
      </slot>
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
