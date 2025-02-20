<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    height?: string;
    width?: string;
    bg?: string;
  }>(),
  {
    bg: "var(--C-T1-O-3)",
    height: "1px",
    width: "100%",
  }
);
</script>

<template>
  <view class="CoDivider" :style="{ background: bg, height, width }"></view>
</template>

<style lang="scss" scoped>
.CoDivider {
  border-radius: var(--R-max);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
