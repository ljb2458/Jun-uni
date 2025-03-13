<script setup lang="ts">
import type { StyleValue } from "vue";
import { bitsAuth } from "@/utils/tools/bits";

export interface CoStateOrmItem extends AnyObject {
  value: StrNumber;
  label: any;
  class?: any;
  style?: StyleValue;
}
export interface CoStateOrm extends Array<CoStateOrmItem> {}
const props = withDefaults(
  defineProps<{
    value?: StrNumber;
    stateOrm?: CoStateOrm;
    defaultIndex?: StrNumber;
    isFun?: Fun<[StrNumber, StrNumber], boolean>;
  }>(),
  {
    isFun: () => (a: any, b: any) => a == b,
  }
);
const current = computed<CoStateOrmItem | undefined>(() => {
  if (!props.stateOrm) return;
  const item = props.stateOrm.find((item) =>
    (props.isFun || bitsAuth)(props.value!, item.value)
  );
  if (!item) {
    return props.stateOrm.at(Number(props.defaultIndex));
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
export default {
  mixins: [mpMixin],
};
</script>
