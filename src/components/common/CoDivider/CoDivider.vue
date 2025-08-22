<!-- 分割线 -->
<script lang="ts" setup>
import mpMixin from "@/components/libs/mixin/mpMixin";
defineOptions(mpMixin);

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