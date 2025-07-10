<!--顶部消息提示组件；在CoPageView中已注册-->

<script lang="ts" setup>
import { ColorTheme } from "@/components/types";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    type?: ColorTheme;
    duration?: number;
    message?: string;
    top?: StrNumber;
  }>(),
  {
    type: "info",
    duration: 3000,
  }
);
const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
}>();

watch(
  () => [props.show, props.duration, props.type, props.message],
  () => {
    if (props.show === true) autoClose(props.duration);
  },
  { deep: true }
);
function close() {
  emit("update:show", false);
}

let timeout: NodeJS.Timeout | void;
function autoClose(time: StrNumber) {
  if (timeout) timeout = clearTimeout(timeout);
  const tm = Number(time);
  if (tm <= 0) return;
  timeout = setTimeout(close, tm);
}
</script>
<template>
  <uv-transition
    class="CoNotify"
    :style="{ top: props.top || '0px' }"
    :class="`CoNotify__${props.type}`"
    :show="props.show"
    mode="slide-top"
  >
    <view class="CoNotify_message p-2.2">
      {{ message }}
    </view>
  </uv-transition>
</template>
<style lang="scss" scoped>
.CoNotify {
  position: fixed;
  left: 0;
  right: 0;
  color: var(--c-white);
  text-align: center;
  padding-top: var(--status-bar-height);
  z-index: 10076;
}

.CoNotify__info {
  background-color: var(--c-jun-bg-2);
  color: var(--c-jun-c);
}
.CoNotify__success {
  background-color: var(--c-jun-success);
}
.CoNotify__error {
  background-color: var(--C-fail);
}
.CoNotify__warning {
  background-color: var(--C-warn);
}
.CoNotify__primary {
  background-color: var(--c-jun-primary);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
