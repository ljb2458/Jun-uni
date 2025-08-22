<!--顶部消息提示组件；在CoPageView中已注册-->

<script lang="ts" setup>
import { ColorTheme } from "@/components/types";
import mpMixin from "@/components/libs/mixin/mpMixin";

defineOptions(mpMixin);
const props = withDefaults(
  defineProps<{
    show?: boolean;
    type?: ColorTheme;
    duration?: number;
    message?: string;
    top?: string;
    customNavHeight?: string;
    zIndex?: StrNumber;
  }>(),
  {
    type: "info",
    duration: 3000,
    top: "0px",
    customNavHeight: "var(--layout-navbar-height)",
    zIndex: 9999999999999,
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
  <wd-transition
    class="CoNotify"
    :style="{ top: `calc(${top} + ${customNavHeight})`, zIndex }"
    :class="`CoNotify__${props.type}`"
    :show="props.show"
    name="slide-down"
  >
    <view class="CoNotify_message p-2.2">
      {{ message }}
    </view>
  </wd-transition>
</template>
<style lang="scss" scoped>
.CoNotify {
  position: fixed;
  left: 0;
  right: 0;
  @apply c-white
  text-align: center;
}

.CoNotify__info {
  @apply c-jun-c bg-jun-bg-2;
}
.CoNotify__success {
  @apply bg-jun-success;
}
.CoNotify__error {
  @apply bg-jun-fail;
}
.CoNotify__warning {
  @apply bg-jun-warn;
}
.CoNotify__primary {
  @apply bg-jun-primary;
}
</style>
