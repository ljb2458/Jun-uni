<!--
 * @Date: 2023-06-14 15:04:30
 * @LastEditTime: 2023-07-03 17:25:46
 * 介绍:顶部消息提示组件
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
  const msgStyle: StyleValue = {};
  return {
    type,
    style,
    msgStyle,
    message: "",
  };
}
function show(message: string, config?: ShowParam) {
  cfg.style = config?.style as any;
  cfg.type = config?.type as any;
  cfg.msgStyle = config?.msgStyle as any;
  cfg.message = message;
  const _cfg: ShowParam = {
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
      <slot></slot>
      <view
        v-html="cfg.message"
        :style="cfg.msgStyle"
        class="Rnotify_message"
      ></view>
    </template>
  </u-notify>
</template>
<style lang="scss" scoped>
.Rnotify {
  color: var(--C-B1);
  &::v-deep .u-notify {
    background: inherit;
    .u-notify__warpper__text {
      font-size: inherit !important;
      color: inherit !important;
    }
  }
}
.Rnotify_message {
  color: var(--C-B1);
}
.Rnotify__info {
  background-color: var(--C-info);
}
.Rnotify__success {
  background-color: var(--C-success);
}
.Rnotify__error {
  background-color: var(--C-fail);
}
.Rnotify__warning {
  background-color: var(--C-warn);
}
.Rnotify__primary {
  background-color: var(--C-M1);
}
</style>
