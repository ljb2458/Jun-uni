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
    // #ifdef H5
    top: "44px",
    // #endif
    duration: 3000,
  }
);
const emit = defineEmits<{
  (e: "update:show", v: boolean): void;
}>();

watch(
  () => props.show,
  (newValue) => {
    if (newValue === true) autoClose(props.duration);
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
  <view
    :style="{ top: props.top || 0 }"
    v-show="props.show"
    class="RNotify"
    :class="`RNotify__${props.type}`"
  >
    {{ message }}
  </view>
</template>
<style lang="scss" scoped>
.RNotify {
  position: fixed;
  left: 0;
  right: 0;
  color: var(--C-B1);
  text-align: center;
  padding: var(--gap-xs) 0;
  z-index: 10076;
}
.RNotify_message {
  color: var(--C-B1);
}
.RNotify__info {
  background-color: var(--C-info);
}
.RNotify__success {
  background-color: var(--C-success);
}
.RNotify__error {
  background-color: var(--C-fail);
}
.RNotify__warning {
  background-color: var(--C-warn);
}
.RNotify__primary {
  background-color: var(--C-M1);
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
