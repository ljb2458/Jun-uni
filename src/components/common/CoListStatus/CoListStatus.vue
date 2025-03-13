<script lang="ts" setup>
export type StateType = "next" | "loading" | "end" | "error" | "null";
const props = withDefaults(
  defineProps<{
    type?: StateType;
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
  <view class="CoListStatus">
    <uv-loading-icon
      :show="props.type === 'loading'"
      :text="props.message"
    ></uv-loading-icon>
    <uv-empty
      :show="props.type === 'null'"
      class="Rempty PT-xl PB-xl"
      :text="props.message"
    >
    </uv-empty>
    <view v-show="props.type === 'next'">
      <uv-divider @click="load" :text="props.message || '继续加载'" />
    </view>
    <view v-show="props.type === 'end'">
      <uv-divider :text="props.message || '没有更多了'" />
    </view>
    <view v-show="props.type === 'error'">
      <CoError
        class="PT-xl PB-xl"
        :message="props.message || '出错了！'"
        @click-button="reload"
      >
      </CoError>
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
