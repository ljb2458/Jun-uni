<script setup lang="ts">
import type { StyleValue } from "vue";
import { isStateByBin } from "@/utils/tools";

export interface StateEnumItem extends AnyObject {
  state: StrNumber;
  label?: any;
  class?: any;
  style?: StyleValue;
}
export interface StateEnum extends Array<StateEnumItem> {}
const props = defineProps<{
  state: StrNumber;
  stateEnum: StateEnum;
  defaultIndex?: StrNumber;
  isFun?: Fun<[StrNumber, StrNumber], boolean>;
}>();
const current = computed<StateEnumItem | undefined>(() => {
  const item = props.stateEnum.find((item) =>
    (props.isFun || isStateByBin)(props.state, item.state)
  );
  if (!item) {
    return props.stateEnum.at(Number(props.defaultIndex));
  }
  return item;
});
</script>

<template>
  <view
    class="CoStateTag"
    :class="current?.class"
    :style="(current?.style as any)"
  >
    <slot :slotProps="current">{{ current?.label }}</slot>
  </view>
</template>

<style lang="scss" scoped>
.CoStateTag {
  display: inline-block;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { extend } from "lodash";
export default {
  mixins: [mpMixin],
};
</script>
