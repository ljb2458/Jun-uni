<!--
 * @Date: 2023-04-24 10:38:17
 * @LastEditTime: 2023-07-03 13:56:39
 * @FilePath: /music-client/src/components/common/CrequestList/CrequestList.vue
 * 介绍:自动请求分页列表
-->
<script lang="ts" setup generic="F extends Api">
import useRequestList, {
  GetRequestBefore,
  Api,
  GetParams,
  State,
} from "@@/hooks/useRequestList";
import { LoadParam } from "../Clist/index";
import Clist from "../Clist/Clist.vue";
import { useClistRef } from "../Clist/index";
import { GetPropsType } from "../../types";
type ClistProps = GetPropsType<typeof Clist>;

const props = withDefaults(
  defineProps<{
    api: F;
    requestBefore?: GetRequestBefore<F>;
    extraParams?: any[];
    isOnePage?: boolean;
    setupLoad?: boolean;
    defaultParams?: GetParams<F>;
    /**上拉触底事件，一般可不传 */
    onReachBottom?: ClistProps["onReachBottom"];
    /**下拉刷新事件，一般可不传 */
    onPullDownRefresh?: (callback: Function) => any;
    /**下拉刷新完成回调，默认uni.stopPullDownRefresh(关闭页面下拉刷新) */
    pullDownRefreshEnd?: (v?: State) => void;
    /**解决微信小程序v-for循环无法获取ref的问题 */
    _ref?: Ref;
  }>(),
  {
    setupLoad: true,
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

const ClistRef = useClistRef();
function activeLoad() {
  return ClistRef.value?.activeLoad();
}
function _load() {
  return ClistRef.value?.load();
}
function activeRelad() {
  return ClistRef.value?.activeRelad();
}
function reload() {
  return ClistRef.value?.reload();
}
function isVisible() {
  return ClistRef.value?.isVisible();
}
</script>
<template>
  <Clist
    class="CrequestList"
    ref="ClistRef"
    :status="state.type"
    :message="state.message"
    :onReachBottom="onReachBottom"
    @load="load"
    :setup-load="setupLoad"
  >
    <slot>
      <slot
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        name="item"
      >
      </slot>
    </slot>
  </Clist>
</template>
<style lang="less" scoped></style>
