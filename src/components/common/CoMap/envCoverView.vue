<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: any;
    style?: StyleValue;
    text?: any;
    show?: boolean;
  }>(),
  { show: true }
);
</script>

<template>
  <!-- #ifdef APP -->
  <cover-view
    v-show="show"
    class="envCoverView"
    :class="[props.class]"
    :style="[props.style]"
  >
    {{ text }}<slot></slot>
  </cover-view>
  <!-- #endif -->
  <!-- #ifndef APP -->
  <view
    v-show="show"
    class="envCoverView"
    :class="[props.class]"
    :style="[props.style]"
  >
    {{ text }}<slot></slot>
  </view>
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
