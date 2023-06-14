import { ColorTheme } from "@@/components/types";
import Rnotify from "./Rnotify.vue";
import type { StyleValue } from "vue";

export interface ShowParam {
  style?: StyleValue;
  msgStyle?: StyleValue;
  top?: StrNumber;
  type?: ColorTheme;
  message?: string;
  duration?: StrNumber;
  safeAreaInsetTop?: boolean;
}

export function useRnotifyRef() {
  return ref<InstanceType<typeof Rnotify>>();
}
export const defaultDuration = 5000;
