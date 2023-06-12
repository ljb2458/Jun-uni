<!--
 * @Date: 2023-04-24 10:38:17
 * @LastEditTime: 2023-04-24 11:01:34
 * @FilePath: /music-client/src/components/common/CrequestFullList/CrequestFullList.vue
 * 介绍:自动请求分页列表
-->
<script lang="ts" setup>
import useRequestList, { RequsetParams } from "@@/hooks/useRequestList";
const props = defineProps<{
  api: Function;
  before?: (params: RequsetParams) => any;
}>();
const { data, request, reRequest } = useRequestList(props.api, props.before);
</script>
<template>
  <CfullList @load="request">
    <slot>
      <slot
        v-for="(item, index) in data"
        :item="item"
        :index="index"
        name="item"
      >
      </slot>
    </slot>
  </CfullList>
</template>
<style lang="less" scoped></style>
