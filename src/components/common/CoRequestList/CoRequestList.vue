<!-- 分页列表组件；可自动调用并处理分页接口。 -->
<script lang="ts" setup generic="F extends RequestList.Api">
import {
  useRequestList,
  RequestList,
} from "@/components/common/CoRequestList/useRequestList";
import CoList from "../CoList/CoList.vue";
import { CoListInstance, LoadParam } from "../CoList/CoList.vue";
import CoRequestList from "./CoRequestList.vue";
export type CoRequestListInstance<F extends RequestList.Api> = Omit<
  GenericComponentExports<typeof CoRequestList>,
  "list" | "result"
> & {
  list: RequestList.GetList<F>;
  result: RequestList.GetRes<F> | undefined;
};
type CoListProps = ComponentPropsType<typeof CoList>;
interface Props {
  /**
   * api(pageNo,props.param,...props.extraParams)=>res
   */
  api: F;
  /**
   * api接口除了
   */
  extraParams?: any[];
  /**是否在setup声明周期自动加载数据 */
  setupLoad?: boolean;
  /**默认初始页码 */
  defPageNo?: number;
  /**返回的参数作为 param 传入，优先级高于props.param*/
  giveParam?: (
    pageNo: number
  ) => Partial<Parameters<F>[1]> | Promise<Partial<Parameters<F>[1]>>;
  /**api 接口的第二个参数，索引为1 */
  param?: Partial<Parameters<F>[1]>;
  /**上拉触底事件，一般可不传 */
  onReachBottom?: CoListProps["onReachBottom"];
  /**下拉刷新事件，一般可不传 */
  onPullDownRefresh?: (callback: Fun) => any;
  /**下拉刷新完成回调，默认uni.stopPullDownRefresh(关闭页面下拉刷新) */
  pullDownRefreshEnd?: (v?: RequestList.State) => void;
  /**组件最小高度 */
  minHeight?: string;
  /**
   * 小程序处于循环中的组件拿不到实例，使用这个方法获取实例
   */
  _ref?: Fun<[instance: any], any>;
}
const props = withDefaults(defineProps<Props>(), {
  defPageNo: 1,
  minHeight: "70vh",
  setupLoad: true,
  giveParam: () => (pageNo: number) => ({}),
  keyName: "id",
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
  defPageNo: props.defPageNo,
  async giveExtraParams(pageNo) {
    return [
      { ...props.param, ...(await props.giveParam(pageNo)) },
      ...(props.extraParams || []),
    ];
  },
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
if (typeof props._ref === "function") props._ref(_expose);

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
    class="CoRequestList"
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
