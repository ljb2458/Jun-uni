<!--
 * @Date: 2023-04-24 10:38:17
 * @LastEditTime: 2023-06-12 19:20:44
 * @FilePath: /music-client/src/components/common/CrequestList/CrequestList.vue
 * 介绍:自动请求分页列表
-->
<script lang="ts" setup generic="D extends any[] = any[]">
import useRequestList, { RequsetParams } from "@@/hooks/useRequestList";
import { LoadParam } from "../Clist/index";
import { Paging, ApiRes } from "@@/api";

type Res = ApiRes<Paging.Data<D> | D>;
interface Req extends Paging.Req {
  [k: string]: any;
}
type Api = (data: Req) => Promise<Res> | Res;

const props = withDefaults(
  defineProps<{
    api: Api;
    requestBefore?: (params: RequsetParams) => any;
    extraParams?: AnyObject;
    isOnePage?: boolean;
    setupLoad?: boolean;
  }>(),
  {
    setupLoad: true,
  }
);
const {
  data,
  state,
  request,
  rerequest,
  stateEnd,
  stateErr,
  stateLoading,
  stateNull,
  stateNext,
} = useRequestList<D>(props.api, {
  requestBefore: props.requestBefore,
  extraParams: props.extraParams,
  isOnePage: props.isOnePage,
});
/**暴露分页hooks */
defineExpose({
  rerequest,
  state,
  data,
  stateEnd,
  stateErr,
  stateLoading,
  stateNull,
  stateNext,
});
function load(e: LoadParam) {
  if (e.reload) return rerequest();
  request();
}
</script>
<template>
  <Clist
    class="CrequestList"
    :status="state.type"
    :message="state.message"
    @load="load"
    :setup-load="props.setupLoad"
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
