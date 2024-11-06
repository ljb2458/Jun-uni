<!--
 * 介绍:状态标签
-->
<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
import type { StyleValue } from "vue";

const className = {
  bg: "CStateTag__bg",
  text: "CStateTag__text",
};

const props = withDefaults(
  defineProps<{
    enum?: CStateTagEmun;
    value?: string | number;
    mode?: keyof typeof className;
  }>(),
  {
    mode: "bg",
  }
);
const current = computed(() => {
  return props.enum?.filter((val) => val.value == props.value)[0];
});
export interface CStateTagEmunItem {
  /**渲染文本 */
  text: string | number;
  /**类名 */
  class?: string;
  /**对应的值 */
  value: string | number;
  /**样式 */
  style?: StyleValue;
}

export type CStateTagEmun = Array<CStateTagEmunItem>;

</script>

<template>
  <text :style="(current?.style as any)" :class="[className[props.mode || 'bg'], current?.class]" class="CStateTag">
    <slot :="{ ...current }"> {{ current?.text }} </slot>
  </text>
</template>

<style lang="less" scoped>
.CStateTag {
  display: inline-block;
  vertical-align: middle;
  font-size: var(--F-S-sm);
  padding: 0.3em 1em;
}

.CStateTag__bg {
  color: var(--C-B1);
  border-radius: 999rem;
  text-align: center;
  background-color: var(--C-M1);
}

.CStateTag__text {
  text-align: center;
}
</style>
