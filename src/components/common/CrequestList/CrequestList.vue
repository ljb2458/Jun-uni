<!--
 * @Date: 2023-04-24 10:38:17
 * @LastEditTime: 2023-06-12 15:48:13
 * @FilePath: /music-client/src/components/common/CrequestList/CrequestList.vue
 * 介绍:自动请求分页列表
-->
<script lang="ts" setup>
import useRequestList, { RequsetParams } from "@@/hooks/useRequestList";
import { LoadParam } from "../Clist/index";

const props = withDefaults(
  defineProps<{
    api: Function;
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
} = useRequestList(props.api, {
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
  <Clist class="CrequestList" @load="load" :setup-load="props.setupLoad">
    <slot>
      <slot
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        name="item"
      >
      </slot>
    </slot>
    <ClistStatus
      :type="state.type"
      :message="state.message"
      @load="request"
      @reload="rerequest"
    >
    </ClistStatus>
  </Clist>
</template>
<style lang="less" scoped></style>
