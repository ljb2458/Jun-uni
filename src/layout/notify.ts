/*
 * @Date: 2023-06-14 16:33:30
 * @LastEditTime: 2023-06-14 20:14:08
 * @FilePath: /music-client/src/layout/notify.ts
 * 介绍:
 */
import { ShowParam, defaultDuration } from "@@/components/rewrite/Rnotify";

export const show = ref(false);
export const message = ref("");
export const param = ref<ShowParam>();

const notify = {
  info(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "info" });
  },
  warn(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "warning" });
  },
  error(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "error" });
  },
  primary(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "primary" });
  },
  success(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "success" });
  },
  show(_message: string, config?: ShowParam) {
    autoClose(config?.duration || defaultDuration);
    message.value = _message;
    param.value = config;
    show.value = true;
  },
  close() {
    show.value = false;
  },
};

let timeout: NodeJS.Timeout | void;
function autoClose(time: StrNumber) {
  if (timeout) timeout = clearTimeout(timeout);
  const tm = Number(time);
  if (tm <= 0) return;
  timeout = setTimeout(notify.close, tm);
}
export default notify;
