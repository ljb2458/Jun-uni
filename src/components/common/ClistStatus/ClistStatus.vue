<!--
 * @Date: 2023-04-21 23:27:24
 * @LastEditTime: 2023-06-12 15:00:05
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
    type: "next",
  }
);
const emit = defineEmits<{
  (e: "load"): void;
  (e: "reload"): void;
}>();
onMounted(load);
function reload() {
  emit("reload");
}
function load() {
  emit("load");
}
</script>
<template>
  <view class="ClistStatus">
    <Rloading :show="props.type === 'loading'" :text="props.message"></Rloading>
    <Rempty
      :show="props.type === 'null'"
      class="Rempty"
      margin-top="80px"
      :text="props.message"
    >
    </Rempty>
    <Rdivider
      v-show="props.type === 'next'"
      @click="load"
      :text="props.message || '继续加载'"
    />
    <Rdivider v-show="props.type === 'end'" :text="props.message" />
    <Cerror
      v-show="props.type === 'error'"
      margin-top="80px"
      :message="props.message"
      @click-button="reload"
    >
    </Cerror>
  </view>
</template>
<style lang="scss" scoped></style>
