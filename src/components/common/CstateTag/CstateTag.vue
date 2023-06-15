<!--
 * @Date: 2023-01-13 11:39:30
 * @LastEditTime: 2023-06-15 17:15:42
 * @FilePath: /music-client/src/components/common/CstateTag/CstateTag.vue
 * 介绍:CstateTag标签
-->
<script lang="ts" setup name="CstateTag">
import type { CstateTagEmun } from "./index";
const className = {
  bg: "CstateTag__bg",
  text: "CstateTag__text",
};

const props = withDefaults(
  defineProps<{
    enum?: CstateTagEmun;
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
</script>

<template>
  <text
    :style="(current?.style as any)"
    :class="[className[props.mode || 'bg'], current?.class]"
    class="CstateTag"
  >
    <slot :="{ ...current }"> {{ current?.text }} </slot>
  </text>
</template>

<style lang="less" scoped>
.CstateTag {
  display: inline-block;
  vertical-align: middle;
  font-size: var(--T-S-sm);
  padding: 0.3em 1em;
}
.CstateTag__bg {
  color: var(--C-B1);
  border-radius: 999rem;
  text-align: center;
  background-color: var(--C-M1);
}
.CstateTag__text {
  text-align: center;
}
</style>
