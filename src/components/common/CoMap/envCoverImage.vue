<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: any;
    style?: StyleValue;
    src?: string;
    show?: boolean;
  }>(),
  { show: true }
);
</script>

<template>
  <!-- #ifdef APP -->
  <cover-image
    v-show="show"
    :src="src"
    class="envCoverImage"
    :class="[props.class]"
    :style="[props.style]"
  >
    <slot></slot>
  </cover-image>
  <!-- #endif -->
  <!-- #ifndef APP -->
  <image
    v-show="show"
    :src="src"
    class="envCoverImage"
    :class="[props.class]"
    :style="[props.style]"
  >
    <slot></slot>
  </image>
  <!-- #endif -->
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { StyleValue } from "vue";
export default {
  mixins: [mpMixin],
};
</script>
