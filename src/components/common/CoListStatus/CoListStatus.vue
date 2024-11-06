<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
import { StateType } from "@/components/common/CoRequestList/useRequestList";
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
function reload() {
  emit("reload");
}
function load() {
  emit("load");
}
</script>
<template>
  <view class="CListStatus">
    <RloadingIcon
      :show="props.type === 'loading'"
      :text="props.message"
    ></RloadingIcon>
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
