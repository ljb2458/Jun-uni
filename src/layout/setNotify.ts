import type CNotify from "@/components/common/CoNotify/CoNotify.vue";
import type { StyleValue } from "vue";

type ShowParam = ComponentPropsType<typeof CNotify> & {
  style?: StyleValue;
};

export const showNotify = ref(false);
export const notifyProps = ref<ShowParam>();

const setNotify = {
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
    notifyProps.value = { ...config, message };
    showNotify.value = true;
  },
  close() {
    showNotify.value = false;
  },
};
export default setNotify;
