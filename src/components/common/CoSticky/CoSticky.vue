<!-- 粘性布局吸顶 -->
<script setup lang="ts">
export interface CoStickyProps {
  /**吸顶时与顶部的距离 */
  offsetTop?: StrNumber;
  /**导航栏高度，自定义导航栏时，需要传入此值 */
  customNavHeight?: StrNumber;
  disabled?: boolean;
  zIndex?: StrNumber;
}
const props = withDefaults(defineProps<CoStickyProps>(), {
  offsetTop: "0px",
  customNavHeight: "var(--layout-navbar-height)",
  zIndex: 999,
});
</script>

<template>
  <view
    class="CoSticky"
    :class="{ CoSticky__disabled: disabled }"
    :style="{
      '--offsetTop': offsetTop || '0px',
      '--customNavHeight': customNavHeight,
      top: `calc(${offsetTop} + ${customNavHeight})`,
      zIndex,
    }"
  >
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.CoSticky {
  position: sticky;
}
.CoSticky__disabled {
  position: initial;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
