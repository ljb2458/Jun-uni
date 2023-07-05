/*
 * @Date: 2023-07-05 20:26:11
 * @LastEditTime: 2023-07-05 20:27:12
 * 介绍:
 */
import Rtextarea from "./Rtextarea.vue";
export function useRtextareaRef() {
  return ref<InstanceType<typeof Rtextarea>>();
}
