/*
 * @Date: 2023-06-14 16:33:30
 * @LastEditTime: 2023-07-06 15:08:38
 * 介绍:
 */
import Rnotify from "@@/components/rewrite/Rnotify/Rnotify.vue";
import type { StyleValue } from "vue";

type ShowParam = ComponentPropsType<typeof Rnotify> & {
  style?: StyleValue;
};

export const show = ref(false);
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
  async show(message: string, config?: ShowParam) {
    this.close();
    await nextTick();
    param.value = { ...config, message };
    show.value = true;
  },
  close() {
    show.value = false;
  },
};
export default notify;
