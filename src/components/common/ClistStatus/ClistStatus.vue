<!--
 * @Date: 2023-04-21 23:27:24
 * @LastEditTime: 2023-04-22 00:03:00
 * @FilePath: /music-client/src/components/common/ClistStatus/ClistStatus.vue
 * 介绍:
-->
<script lang="ts" setup>
import { StateType } from "@@/hooks/useRequestList";
const props = withDefaults(
  defineProps<{
    type: StateType;
    message?: string;
  }>(),
  {
    type: "",
  }
);
const emit = defineEmits<{
  (e: "load"): void;
}>();
</script>
<template>
  <view class="ClistStatus">
    <Rloading :show="props.type === 'loading'" :text="props.message"></Rloading>
    <Rempty :show="props.type === 'null'" :text="props.message"></Rempty>
    <Rdivider
      @click="emit('load')"
      v-show="props.type === ''"
      :text="props.message"
    />
    <Rdivider v-show="props.type === 'end'" :text="props.message" />
  </view>
</template>
<style lang="scss" scoped></style>
