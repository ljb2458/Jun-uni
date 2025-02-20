<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  { show: true }
);
</script>

<template>
  <!-- #ifdef APP -->
  <cover-view v-show="show" class="envCoverView">
    <slot></slot>
  </cover-view>
  <!-- #endif -->
  <!-- #ifndef APP -->
  <view v-show="show" class="envCoverView">
    <slot></slot>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
