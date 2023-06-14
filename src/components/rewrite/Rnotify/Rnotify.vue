<!--
 * @Date: 2023-06-14 15:04:30
 * @LastEditTime: 2023-06-14 16:23:15
 * @FilePath: /music-client/src/components/rewrite/Rnotify/Rnotify.vue
 * 介绍:
-->
<script lang="ts" setup>
import { ShowParam, defaultDuration } from "./index";
import type { StyleValue } from "vue";
import { ColorTheme } from "@@/components/types";

const notifyRef = ref<AnyObject | undefined>();
const cfg = reactive(initCfg());

function initCfg() {
  const style: StyleValue = {};
  const type: ColorTheme = "primary";
  return {
    type,
    style,
    message: "",
  };
}
function show(message: string, config?: ShowParam) {
  cfg.style = config?.style as any;
  cfg.message = message;
  const _cfg: ShowParam = {
    safeAreaInsetTop: true,
    duration: defaultDuration,
    ...config,
  };
  notifyRef.value?.show(_cfg);
}

function close() {
  notifyRef.value?.close();
}
defineExpose({ show, close, info, warn, error, primary, success });
function info(message: string, config?: ShowParam) {
  show(message, { ...config, type: "info" });
}
function warn(message: string, config?: ShowParam) {
  show(message, { ...config, type: "warning" });
}
function error(message: string, config?: ShowParam) {
  show(message, { ...config, type: "error" });
}
function primary(message: string, config?: ShowParam) {
  show(message, { ...config, type: "primary" });
}
function success(message: string, config?: ShowParam) {
  show(message, { ...config, type: "success" });
}
</script>
<template>
  <u-notify
    class="Rnotify"
    :class="`Rnotify__${cfg.type}`"
    :style="cfg.style"
    ref="notifyRef"
  >
    <template #icon>
      <slot><view v-html="cfg.message"></view></slot>
    </template>
  </u-notify>
</template>
<style lang="scss" scoped>
.Rnotify {
  color: var(--C-B1);
  &::v-deep .u-notify {
    background: initial;
    .u-notify__warpper__text {
      font-size: initial !important;
      color: initial !important;
    }
  }
}
.Rnotify__info {
  background-color: var(--C-info);
}
.Rnotify__success {
  background-color: var(--C-success);
}
.Rnotify__error {
  background-color: var(--C-error);
}
.Rnotify__warning {
  background-color: var(--C-warn);
}
.Rnotify__primary {
  background-color: var(--C-M1);
}
</style>
