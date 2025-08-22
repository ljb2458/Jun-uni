import type CNotify from "@/components/common/CoNotify/CoNotify.vue";
import type { StyleValue } from "vue";

type ShowParam = ComponentPropsType<typeof CNotify> & {
  style?: StyleValue;
};

export const showNotify = ref(false);
export const notifyProps = ref<ShowParam>();

const setNotify = {
  /**打开全局 notify 提示 */
  info(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "info" });
  },
  /**打开全局 notify 提示 */
  warn(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "warning" });
  },
  /**打开全局 notify 提示 */
  error(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "error" });
  },
  /**打开全局 notify 提示 */
  primary(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "primary" });
  },
  /**打开全局 notify 提示 */
  success(message: string, config?: ShowParam) {
    this.show(message, { ...config, type: "success" });
  },
  /**打开全局 notify 提示 */
  async show(message: string, config?: ShowParam) {
    this.close();
    await nextTick();
    notifyProps.value = { ...config, message };
    showNotify.value = true;
  },
  /**关闭全局 notify 提示 */
  close() {
    showNotify.value = false;
  },
};
export default setNotify;
