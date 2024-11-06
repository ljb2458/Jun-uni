<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup generic="F extends Api">
import useRequestList, {
  GetRequestBefore,
  Api,
  GetParams,
  State,
  GetApiData, GetApiRes
} from "@/components/common/CoRequestList/useRequestList";
import CList from "../CList/CList.vue";
import { useCListRef, LoadParam } from "../CoList/CoList.vue";
import CRequestList from "./CoRequestList.vue";

type CListProps = ComponentPropsType<typeof CList>;
type InstanceTemp = GenericComponentExports<typeof CRequestList>;

export type Instance<F extends Api> = Omit<InstanceTemp, "data" | "res"> & {
  data: GetApiData<F>;
  res: GetApiRes<F> | undefined;
};

const props = withDefaults(
  defineProps<{
    api: F;
    requestBefore?: GetRequestBefore<F>;
    extraParams?: any[];
    isOnePage?: boolean;
    setupLoad?: boolean;
    defaultParams?: GetParams<F>;
    /**上拉触底事件，一般可不传 */
    onReachBottom?: CListProps["onReachBottom"];
    /**下拉刷新事件，一般可不传 */
    onPullDownRefresh?: (callback: Function) => any;
    /**下拉刷新完成回调，默认uni.stopPullDownRefresh(关闭页面下拉刷新) */
    pullDownRefreshEnd?: (v?: State) => void;
    /**解决微信小程序v-for循环无法获取ref的问题 */
    _ref?: Ref;
    minHeight?: string;
  }>(),
  {
    setupLoad: true,
    minHeight: "70vh",
  }
);
const pullDownRefresh = props.onPullDownRefresh || onPullDownRefresh;
const pullDownRefreshEnd = props.pullDownRefreshEnd || uni.stopPullDownRefresh;
pullDownRefresh(pullDownRefreshRequset);
/**下拉刷新请求 */
async function pullDownRefreshRequset() {
  if (!(await isVisible())) return;
  if (state.value.type === "loading") return;
  const res = await rerequest();
  pullDownRefreshEnd(res);
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
} = useRequestList(props.api, {
  requestBefore: props.requestBefore,
  extraParams: props.extraParams,
  isOnePage: props.isOnePage,
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

const CListRef = useCListRef();
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
  <CList class="CRequestList" ref="CListRef" :status="state.type" :message="state.message"
    :onReachBottom="onReachBottom" @load="load" :setup-load="setupLoad" :min-height="props.minHeight">
    <slot>
      <slot v-for="(item, index) in data" :item="item" :index="index" name="item">
      </slot>
    </slot>
  </CList>
</template>
<style lang="scss" scoped></style>
