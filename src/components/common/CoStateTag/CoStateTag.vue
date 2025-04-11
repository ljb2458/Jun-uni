<!-- 状态标签 -->
<script setup lang="ts">
import type { StyleValue } from "vue";
import { bitsAuth } from "@/utils/tools/bits";

export interface StateOrmItem extends AnyObject {
  value: StrNumber;
  label: any;
  class?: any;
  style?: StyleValue;
}
export interface CoStateOrm extends Array<StateOrmItem> {}
const props = withDefaults(
  defineProps<{
    /**状态 */
    value?: StrNumber;
    /**状态映射 */
    stateOrm?: CoStateOrm;
    /**默认选中第几个状态（不推荐） */
    defaultIndex?: StrNumber;
    /**匹配用的方法；二进制权限可使用 bitsAuth */
    isFun?: Fun<[StrNumber, StrNumber], boolean>;
  }>(),
  {
    isFun: () => (a: any, b: any) => a == b,
  }
);
const current = computed<StateOrmItem | undefined>(() => {
  if (!props.stateOrm) return;
  const item = props.stateOrm.find((item) =>
    props.isFun(props.value!, item.value)
  );
  if (!item) {
    return props.stateOrm[Number(props.defaultIndex)];
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
