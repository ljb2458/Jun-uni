<!-- 分割线 -->
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    height?: string;
    width?: string;
    bg?: string;
  }>(),
  {
    height: "1px",
    width: "100%",
  }
);
</script>

<template>
  <view class="CoDivider" :style="{ height, width }"></view>
</template>

<style lang="scss" scoped>
.CoDivider {
  @apply rd-9999999px bg-jun-primary;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
