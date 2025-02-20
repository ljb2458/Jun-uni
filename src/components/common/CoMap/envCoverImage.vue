<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
    show?: boolean;
  }>(),
  { show: true }
);
</script>

<template>
  <!-- #ifdef APP -->
  <cover-image v-show="show" :src="src" class="envCoverImage">
    <slot></slot>
  </cover-image>
  <!-- #endif -->
  <!-- #ifndef APP -->
  <image v-show="show" :src="src" class="envCoverImage">
    <slot></slot>
  </image>
  <!-- #endif -->
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
