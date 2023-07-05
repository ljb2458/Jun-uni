import Rinput from "./Rinput.vue";
export function useRinputRef() {
  return ref<InstanceType<typeof Rinput>>();
}

export type ConfirmType = "send" | "search" | "next" | "go" | "done";

